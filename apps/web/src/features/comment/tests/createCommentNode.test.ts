import { getGraphDbClient } from '@/shared/lib/graphdb/kuzu';
import { createCommentNode, createUserNode, initDb } from '../model/comment/create';
import { getQueryData } from './mock/util';

jest.mock('@kuzu/kuzu-wasm', () => {
  const originalModule = jest.requireActual('@kuzu/kuzu-wasm');
  const { createMockDb } = jest.requireActual('./mock/mockDb');
  return createMockDb(originalModule);
});

describe('createCommentNode', () => {
  beforeAll(async () => {
    await initDb();
  });
  afterEach(async () => {
    const conn = await getGraphDbClient();
    await conn.execute('MATCH (n) DETACH DELETE n');
  });
  test.each([
    [
      {
        id: 'test-comment-id-1',
        message: 'test-message-1',
        timestamp: '2021-01-01T00:00:00Z',
        peerId: 'test-peer-id-1',
        toCommentId: 'test-comment-id-2',
      },
    ],
    [
      {
        id: 'test-comment-id-2',
        message: 'test-message-2',
        timestamp: '2021-01-01T00:00:00Z',
        peerId: 'test-peer-id-2',
      },
    ],
  ])('コメントを作成できること: %s', async (msg) => {
    await createUserNode(msg.peerId);
    await createCommentNode(msg);
    const conn = await getGraphDbClient();
    // [{"c":{"_ID":{"offset":"0","table":"1"},"_LABEL":"Comment","peerId":"test-peer-id-1","id":"test-comment-id-1","message":"test-message-1","timestamp":"2021-01-01T00:00:00Z"}},{"c":{"_ID":{"offset":"0","table":"0"},"_LABEL":"User","peerId":"test-peer-id-1","id":null,"message":null,"timestamp":null}}]
    const result = await conn.execute('MATCH (c:Comment) RETURN (c)');
    const list = getQueryData(result);
    const [ret] = list;
    expect(ret['c'].id).toBe(msg.id);
    expect(ret['c'].message).toBe(msg.message);
    expect(ret['c'].timestamp).toBe(msg.timestamp);
    expect(ret['c'].peerId).toBe(msg.peerId);
  });
  test('コメントを作成できること: 返信コメント', async () => {
    await createCommentNode({
      id: 'test-comment-id-2',
      message: 'test-message-2',
      timestamp: '2021-01-01T00:00:00Z',
      peerId: 'test-peer-id-2',
    });
    const msg = {
      id: 'test-comment-id-1',
      message: 'test-message-1',
      timestamp: '2021-01-01T00:00:00Z',
      peerId: 'test-peer-id-1',
      toCommentId: 'test-comment-id-2',
    };
    await createUserNode(msg.peerId);
    await createCommentNode(msg);

    const conn = await getGraphDbClient();

    const result = await conn.execute('MATCH (s)-[:Res]->(d) RETURN (s), (d)');
    const [ret] = getQueryData(result);
    expect(ret['s'].id).toBe(msg.id);
    expect(ret['d'].id).toBe(msg.toCommentId);
  });
});

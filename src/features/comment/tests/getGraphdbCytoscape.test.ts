import { getGraphDbClient } from '@/shared/lib/graphdb/kuzu';
import { createCommentNode, initDb } from '../model/comment/create';
import { getGraphdbCytoscape } from '../model/comment/match';
import { msg1, msg2 } from './fixture/commentData';

jest.mock('@kuzu/kuzu-wasm', () => {
  const originalModule = jest.requireActual('@kuzu/kuzu-wasm');
  const { createMockDb } = jest.requireActual('./mock/mockDb');
  return createMockDb(originalModule);
});

describe('getGraphdbCytoscape', () => {
  beforeAll(async () => {
    await initDb();
  });
  afterEach(async () => {
    const conn = await getGraphDbClient();
    await conn.execute('MATCH (n) DETACH DELETE n');
  });
  test('DBが空の時に空配列が返ること', async () => {
    const ret = await getGraphdbCytoscape();
    expect(ret.length).toBe(0);
  });
  test('返信元がsource、返信先がtargetになっていること', async () => {
    const base = msg2;
    const reply = msg1;
    await createCommentNode(base);
    await createCommentNode(reply);

    const ret = await getGraphdbCytoscape();

    // console.log(JSON.stringify(ret));
    // [{"data":{"id":"id_1_0","label":"test-message-2","type":"Comment","commentId":"test-comment-id-2","peerId":"test-peer-id-2"}},{"data":{"id":"id_1_1","label":"test-message-1","type":"Comment","commentId":"test-comment-id-1","peerId":"test-peer-id-1"}},{"data":{"source":"id_1_1","target":"id_1_0","id":"id_3_0","label":""},"selectable":false}]
    expect(ret.length).toBe(3);
    const [node1, node2, rel] = ret;
    expect(node1.data.commentId).toBe(base.id);
    expect(node1.data.label).toBe(base.message);
    expect(node2.data.commentId).toBe(reply.id);
    expect(node2.data.label).toBe(reply.message);
    expect(rel.data.source).toBe(node2.data.id);
    expect(rel.data.target).toBe(node1.data.id);
  });
});

import { getGraphDbClient } from '@/shared/lib/graphdb/kuzu';
import { createUserNode, initDb } from '../model/comment/create';
import type { QueryResult } from '@kuzu/kuzu-wasm';

// https://qiita.com/Leech/items/5cd1e83253d0179b0cec
jest.mock('@kuzu/kuzu-wasm', () => {
  const originalModule = jest.requireActual('@kuzu/kuzu-wasm');
  const { createMockDb } = jest.requireActual('./mock/mockDb'); // 普通にimportすると、 ReferenceError: Cannot access '_mockDb' before initialization が発生する
  return createMockDb(originalModule);
});

describe('createUserNode', () => {
  beforeAll(async () => {
    await initDb();
  });
  afterEach(async () => {
    const conn = await getGraphDbClient();
    await conn.execute('MATCH (n) DETACH DELETE n');
  });
  test.each([['test-peer-id-1'], ['test-peer-id-2']])('ユーザを作成できること: %s', async (pid) => {
    await createUserNode(pid);
    const conn = await getGraphDbClient();
    const result = await conn.execute('MATCH (u) RETURN (u)');
    const [ret] = getQueryData(result); //  [{"u": {"_ID": {"offset": "0", "table": "0"}, "_LABEL": "User", "id": null, "message": null, "peerId": "test-peer-id", "timestamp": null}}]
    expect(ret['u'].peerId).toBe(pid);
  });
});
function getQueryData(result: QueryResult) {
  if (!result.table) return [];

  return JSON.parse(result.table.toString());
}

/* eslint-disable @typescript-eslint/no-explicit-any */

import { getGraphDbClient } from '@/shared/lib/graphdb/kuzu';
import { createUserNode, initDb } from '../model/comment/create';
import { initializeWebDatabase, initializeWebConnection } from './helper.mjs';
import type { QueryResult } from '@kuzu/kuzu-wasm';

// https://qiita.com/Leech/items/5cd1e83253d0179b0cec
jest.mock('@kuzu/kuzu-wasm', () => {
  // https://github.com/unswdb/kuzu-wasm/blob/main/packages/kuzu-wasm/src/index.js
  return async () => {
    const originalModule = jest.requireActual('@kuzu/kuzu-wasm');
    const m = await originalModule();
    const Database = () => initializeWebDatabase(m);
    const Connection = (...args: [any, number]) => initializeWebConnection(m, ...args);
    return {
      ...m,
      Database,
      Connection,
    };
  };
});

describe('createUserNode', () => {
  test('テストユーザを作成できること', async () => {
    await initDb();
    await createUserNode('test-peer-id');
    const conn = await getGraphDbClient();
    const result = await conn.execute('MATCH (u) RETURN (u)');
    const [ret] = getQueryData(result); //  [{"n": {"_ID": {"offset": "0", "table": "0"}, "_LABEL": "User", "id": null, "message": null, "peerId": "test-peer-id", "timestamp": null}}]
    expect(ret['u'].peerId).toBe('test-peer-id');
  });
});
function getQueryData(result: QueryResult) {
  if (!result.table) return [];

  return JSON.parse(result.table.toString());
}

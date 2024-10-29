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
  beforeEach(async () => {
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

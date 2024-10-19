/* eslint-disable sonarjs/new-cap */
import kuzu_wasm from '@kuzu/kuzu-wasm';
import type { Connection } from '@kuzu/kuzu-wasm';

let conn: Connection | null = null;
export const getGraphDbClient = async () => {
  if (conn != null) {
    return conn;
  }
  const kuzu = await kuzu_wasm();
  const db = await kuzu.Database();
  conn = await kuzu.Connection(db);
  return conn;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import { initializeWebConnection, initializeWebDatabase } from './helper.mjs';

export const createMockDb =
  (originalModule: any) =>
  // https://github.com/unswdb/kuzu-wasm/blob/main/packages/kuzu-wasm/src/index.js
  async () => {
    const m = await originalModule();
    const Database = () => initializeWebDatabase(m);
    const Connection = (...args: [any, number]) => initializeWebConnection(m, ...args);
    return {
      ...m,
      Database,
      Connection,
    };
  };

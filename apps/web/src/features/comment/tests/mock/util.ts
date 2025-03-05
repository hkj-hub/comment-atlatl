import type { QueryResult } from '@kuzu/kuzu-wasm';

export function getQueryData(result: QueryResult) {
  if (!result.table) return [];

  return JSON.parse(result.table.toString());
}

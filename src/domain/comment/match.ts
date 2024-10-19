import { getGraphDbClient } from '@/shared/lib';
import { MessagePaylad } from '@/store/slices/messageSlice';
import type { QueryResult } from '@kuzu/kuzu-wasm';

type ID = { offset: string; table: string };
const getQuueryData = (result: QueryResult) => {
  if (!result.table) return [];
  return JSON.parse(result.table.toString());
};

type DBNodeResult = MessagePaylad & { _ID: ID; _LABEL: string };
type DBRelResult = { _ID: ID; _SRC: ID; _DST: ID };
const getId = (id: ID): string => `id_${id.table}_${id.offset}`;
const getLabel = (n: DBNodeResult) => {
  if (n._LABEL === 'User') return n.peerId.slice(0, 4);
  return n.message;
};
export const getGraphdbCytoscape = async () => {
  const conn = await getGraphDbClient();
  const nodesResult = await conn.execute('MATCH (n) RETURN (n)');
  const nodes = getQuueryData(nodesResult);

  const relsResult = await conn.execute('MATCH (a:User)-[r:Has]->(c:Comment) RETURN (r)');
  const rels = getQuueryData(relsResult);

  const nodeData = nodes.map(({ n }: { n: DBNodeResult }) => ({
    data: { id: getId(n._ID), label: getLabel(n), type: n._LABEL },
  }));
  const relData = rels.map(({ r }: { r: DBRelResult }) => ({
    data: {
      source: getId(r._SRC),
      target: getId(r._DST),
      id: getId(r._ID),
      label: '所持',
    },
    selectable: false,
  }));

  return [...nodeData, ...relData];
};

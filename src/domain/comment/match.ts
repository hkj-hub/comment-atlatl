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
const createNode = (n: DBNodeResult) => {
  const data = { id: getId(n._ID), label: getLabel(n), type: n._LABEL };
  if (n._LABEL === 'User') {
    return {
      data: { ...data, peerId: n.peerId },
      selectable: false,
    };
  }
  return {
    data: { ...data, commentId: n.id, shape: 'triangle' },
  };
};
const toRel = ({ r }: { r: DBRelResult }) => ({
  data: {
    source: getId(r._SRC),
    target: getId(r._DST),
    id: getId(r._ID),
    label: '',
  },
  selectable: false,
});
export const getGraphdbCytoscape = async (self: string) => {
  const conn = await getGraphDbClient();
  const nodesResult = await conn.execute('MATCH (n) RETURN (n)');
  const nodes = getQuueryData(nodesResult);
  const relsResult = await conn.execute(
    `MATCH (a:User)-[r:Has]->(c:Comment) WHERE COUNT { MATCH (c)-[:Res]->(o:Comment) WHERE o.peerId = '${self}' } = 0 RETURN (r)`,
  );
  const rels = getQuueryData(relsResult);
  const commentRelsResult = await conn.execute('MATCH (a:Comment)-[r:Res]->(c:Comment) RETURN (r)');
  const commentRels = getQuueryData(commentRelsResult);
  const nodeData = nodes.map(({ n }: { n: DBNodeResult }) => createNode(n));
  const otherUserRelsResult = await conn.execute(
    `MATCH (a:User)-[r:Has]->(:Comment)-[:Res]->(:Comment) WHERE a.peerId <> '${self}' RETURN (r)`,
  );
  const otherUserRels = getQuueryData(otherUserRelsResult);

  return [...nodeData, ...rels.map(toRel), ...commentRels.map(toRel), ...otherUserRels.map(toRel)];
};

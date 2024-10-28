import { featureFlag } from '@/shared/config/featureFlag';
import { getGraphDbClient } from '@/shared/lib/graphdb/kuzu';
import type { MessagePaylad } from '@/entities/message';
import type { Connection, QueryResult } from '@kuzu/kuzu-wasm';

type ID = { offset: string; table: string };
const getQueryData = (result: QueryResult) => {
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
    data: { ...data, commentId: n.id, peerId: n.peerId },
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
async function getNode(conn: Connection) {
  if (featureFlag.useUserFeature) {
    return conn.execute('MATCH (n) RETURN (n)');
  }
  return conn.execute('MATCH (n:Comment) RETURN (n)');
}
async function getUserRelation(conn: Connection) {
  if (!featureFlag.useUserFeature) {
    return { table: undefined } as unknown as QueryResult;
  }
  const relsResult = await conn.execute(
    `MATCH (a:User)-[r:Has]->(c:Comment)
        WHERE COUNT {
          MATCH (c)-[:Res]->(o:Comment)
           WHERE o.peerId = a.peerId
        } = 0
    RETURN (r)`,
  );
  return relsResult;
}
export const getGraphdbCytoscape = async () => {
  const conn = await getGraphDbClient();
  const nodesResult = await getNode(conn);
  const nodes = getQueryData(nodesResult);
  const relsResult = await getUserRelation(conn);
  const rels = getQueryData(relsResult);
  const commentRelsResult = await conn.execute('MATCH (a:Comment)-[r:Res]->(c:Comment) RETURN (r)');
  const commentRels = getQueryData(commentRelsResult);
  const nodeData = nodes.map(({ n }: { n: DBNodeResult }) => createNode(n));

  return [...nodeData, ...rels.map(toRel), ...commentRels.map(toRel)];
};

import { QueryResult } from '@kuzu/kuzu-wasm';
import { getGraphDbClient } from '@/shared/lib';
import { MessagePaylad } from '@/store/slices/messageSlice';

export const initDb = async () => {
  const conn = await getGraphDbClient();

  // Create schema
  await conn.execute('CREATE NODE TABLE User(peerId STRING, PRIMARY KEY (peerId))');
  await conn.execute(
    'CREATE NODE TABLE Comment(id STRING, message string, timestamp string, PRIMARY KEY (id))',
  );
  await conn.execute('CREATE REL TABLE Has(FROM User TO Comment)');
};
export const createUserNode = async (peerId: string) => {
  const conn = await getGraphDbClient();
  await conn.execute(`CREATE (u:User {peerId: '${peerId}'});`);
};
export const createCommentNode = async (msg: MessagePaylad) => {
  console.log('createCommnetNode', msg);
  const conn = await getGraphDbClient();
  await conn.execute(`CREATE (u:User {peerId: '${msg.peerId}'});`);
  await conn.execute(
    `CREATE (c:Comment {id: '${msg.id}',message: '${msg.message}',timestamp: '${msg.timestamp}'});`,
  );
  await conn.execute(
    `MATCH (u:User), (c:Comment)
WHERE u.peerId = '${msg.peerId}' AND c.id = '${msg.id}'
CREATE (u)-[:Has]->(c);`,
  );
};
type ID = { offset: string; table: string };
const getQuueryData = (result: QueryResult) => {
  if (!result.table) return [];
  return JSON.parse(result.table.toString());
};

type DBNodeResult = MessagePaylad & { _ID: ID; _LABEL: string };
type DBRelResult = { _ID: ID; _SRC: ID; _DST: ID };
export const getGraphdbCytoscape = async () => {
  const conn = await getGraphDbClient();
  const nodesResult = await conn.execute('MATCH (n) RETURN (n)');
  const nodes = getQuueryData(nodesResult);

  const relsResult = await conn.execute('MATCH (a:User)-[r:Has]->(c:Comment) RETURN (r)');
  const rels = getQuueryData(relsResult);
  const getId = (id: ID): string => `id_${id.table}_${id.offset}`;
  const getLabel = (n: DBNodeResult) => {
    if (n._LABEL === 'User') return n.peerId.slice(0, 4);
    return n.message;
  };
  const nodeData = nodes.map(({ n }: { n: DBNodeResult }) => ({
    data: { id: getId(n._ID), label: getLabel(n) },
  }));
  const relData = rels.map(({ r }: { r: DBRelResult }) => ({
    data: {
      source: getId(r._SRC),
      target: getId(r._DST),
      id: getId(r._ID),
      label: '所持',
    },
  }));

  return [...nodeData, ...relData];
};

import { getGraphDbClient } from '@/shared/lib';
import { Message } from '@/store/slices/messageSlice';

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
export const createCommentNode = async (msg: Message) => {
  const conn = await getGraphDbClient();
  await conn.execute(
    `CREATE (c:Comment {id: '${msg.id}',message: '${msg.message}',timestamp: '${msg.timestamp}'});`,
  );
};

export const getGraphdbCytoscape = async () => {
  const conn = await getGraphDbClient();
  const res = await conn.execute('MATCH (n) RETURN n');
  console.log(res);
  if (res.table) {
    const data = JSON.parse(res.table.toString());
    console.log(data);
  }
  return [];
};

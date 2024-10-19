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
  await conn.execute('CREATE REL TABLE Res(FROM Comment TO Comment)');
};
export const createUserNode = async (peerId: string) => {
  const conn = await getGraphDbClient();
  await conn.execute(`CREATE (u:User {peerId: '${peerId}'});`);
};
export const createCommentNode = async (msg: MessagePaylad, toCommentId?: string | null) => {
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

  if (toCommentId) {
    await conn.execute(
      `MATCH (s:Comment), (d:Comment)
        WHERE s.id = '${msg.id}' AND d.id = '${toCommentId}'
        CREATE (s)-[:Res]->(d);`,
    );
  }
};

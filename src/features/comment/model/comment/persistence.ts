import { getGraphDbClient } from '@/shared/lib';
import { getKuzu } from '@/shared/lib/graphdb/kuzu';

const KEY_COMMENT = 'backup_graphdb_comment';
const KEY_COMMENT_RES = 'backup_graphdb_comment_response';

export const saveComment = async () => {
  const conn = await getGraphDbClient();
  const kuzu = await getKuzu();

  await conn.execute(
    `COPY (MATCH (u:Comment) RETURN u.*) TO '/${KEY_COMMENT}.csv' (header=false);`,
  );
  const node = kuzu.FS.readFile(`/${KEY_COMMENT}.csv`, { encoding: 'utf8' });
  localStorage.setItem(KEY_COMMENT, node);

  await conn.execute(
    `COPY (MATCH (a:Comment)-[f:Res]->(b:Comment) RETURN a.id, f.since, b.id) TO '/${KEY_COMMENT_RES}.csv' (header=false, delim='|');`,
  );
  const rel = kuzu.FS.readFile(`/${KEY_COMMENT_RES}.csv`, { encoding: 'utf8' });
  localStorage.setItem(KEY_COMMENT_RES, rel);
};
export const loadComment = async () => {
  const conn = await getGraphDbClient();
  const kuzu = await getKuzu();
  kuzu.FS.writeFile(`/${KEY_COMMENT}.csv`, localStorage.getItem(KEY_COMMENT) || '');
  kuzu.FS.writeFile(`/${KEY_COMMENT_RES}.csv`, localStorage.getItem(KEY_COMMENT_RES) || '');
  await conn.execute(`MATCH (u:Comment) DETACH DELETE u`);
  await conn.execute(`COPY Comment FROM "/${KEY_COMMENT}.csv"`);
  await conn.execute(`COPY Res FROM "/${KEY_COMMENT_RES}.csv"`);
};

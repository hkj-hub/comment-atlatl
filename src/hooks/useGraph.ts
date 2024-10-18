import { useEffect, useState } from 'react';
import { getGraphDbClient } from '@/shared/lib';
import { useAppSelector } from '@/store/hooks';
import { textsSelector } from '@/store/selector/simulatorSelector';

export const useGraph = () => {
  const [elements, setElements] = useState<
    { data: { id?: string; source?: string; target?: string; label?: string } }[]
  >([]);
  const texts = useAppSelector(textsSelector);
  useEffect(() => {
    (async () => {
      const conn = await getGraphDbClient();

      // Create schema
      await conn.execute('CREATE NODE TABLE User(name STRING, age INT64, PRIMARY KEY (name))');
      await conn.execute(
        'CREATE NODE TABLE City(name STRING, population INT64, PRIMARY KEY (name))',
      );
      await conn.execute('CREATE REL TABLE Follows(FROM User TO User, since INT64)');
      await conn.execute('CREATE REL TABLE LivesIn(FROM User TO City)');
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const conn = await getGraphDbClient();
      await Promise.allSettled(
        texts.map(async (text) => {
          await conn.execute(`
          CREATE (u:User {name: '${text.text}', age: 35});`);
        }),
      );

      const res = await conn.execute(`MATCH (a:User) RETURN *;`);
      if (res.table === undefined) return;
      const users = JSON.parse(res.table.toString());
      type ID = { offset: string; table: string };
      const getId = (id: ID): string => `id_${id.table}_${id.offset}`;
      const nodes = users.map(({ a }: { a: { _ID: ID; name: string } }) => ({
        data: { id: getId(a._ID), label: a.name },
      }));

      setElements([...nodes]);
    })();
  }, [texts]);
  return { elements };
};

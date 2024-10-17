/* eslint-disable sonarjs/new-cap */
import kuzu_wasm from '@kuzu/kuzu-wasm';
import Cytoscape from 'cytoscape';
import { useEffect, useRef, useState } from 'react';
import { CytoscapeComponent } from '@/shared/ui';

function Graph() {
  const [elements, setElements] = useState<
    { data: { id?: string; source?: string; target?: string; label?: string } }[]
  >([]);
  const cyref = useRef<Cytoscape.CoreLayout | null>(null);
  useEffect(() => {
    (async () => {
      const kuzu = await kuzu_wasm();
      const db = await kuzu.Database();
      const conn = await kuzu.Connection(db);

      // Create schema
      await conn.execute('CREATE NODE TABLE User(name STRING, age INT64, PRIMARY KEY (name))');
      await conn.execute(
        'CREATE NODE TABLE City(name STRING, population INT64, PRIMARY KEY (name))',
      );
      await conn.execute('CREATE REL TABLE Follows(FROM User TO User, since INT64)');
      await conn.execute('CREATE REL TABLE LivesIn(FROM User TO City)');

      // Insert data
      await conn.execute(`
        CREATE NODE TABLE User(name STRING, age INT64, PRIMARY KEY (name));
        CREATE (u:User {name: 'Alice', age: 35});`);
      const res = await conn.execute(`MATCH (a:User) RETURN *;`);
      const users = JSON.parse(res.table.toString());
      type ID = { offset: string; table: string };
      const getId = (id: ID): string => `id_${id.table}_${id.offset}`;
      const nodes = users.map(({ a }: { a: { _ID: ID; name: string } }) => ({
        data: { id: getId(a._ID), label: a.name },
      }));

      setElements([...nodes]);
      if (cyref.current) {
        cyref.current.layout({ name: 'grid' }).run();
      }
    })();
  }, []);
  return (
    <CytoscapeComponent
      elements={elements}
      cy={(cy) => {
        cyref.current = cy;
      }}
      layout={{ name: 'grid' }}
      wheelSensitivity={0.1}
      style={{ width: '600px', height: '600px' }}
    />
  );
}

export default Graph;

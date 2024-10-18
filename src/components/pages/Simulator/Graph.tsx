import Cytoscape from 'cytoscape';
import { useEffect, useRef } from 'react';
import { useGraph } from '@/hooks/useGraph';
import { CytoscapeComponent } from '@/shared/ui';

function Graph() {
  const cyref = useRef<Cytoscape.CoreLayout | null>(null);
  const { elements } = useGraph();
  useEffect(() => {
    if (cyref.current) {
      cyref.current.layout({ name: 'grid' }).run();
    }
  }, [elements]);
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

import Cytoscape from 'cytoscape';
import { useEffect, useRef } from 'react';
import { CytoscapeComponent } from '@/shared/ui/graph-viewer';
import { useGraph } from '../model/useGraph';

function getLayoutOption(layout: string) {
  const base = { name: layout, fit: false };
  if (layout === 'cose') {
    return { ...base, animate: false };
  }
  if (layout === 'grid' || layout === 'random') {
    return { ...base, fit: true };
  }
  return base;
}

function Graph() {
  const cyref = useRef<Cytoscape.Core | null>(null);
  const { elements, initCytoscape, selectedLabel, save, load } = useGraph();

  const changeLayout = (layout: string) => {
    if (!cyref.current) return;
    cyref.current.layout(getLayoutOption(layout)).run();
  };
  useEffect(() => {
    if (!cyref.current || elements.length > 10) return;
    cyref.current.layout({ name: 'breadthfirst' }).run();
  }, [elements]);
  return (
    <div>
      <div>
        整列:
        <button onClick={() => changeLayout('breadthfirst')}>breadthfirst</button>
        <button onClick={() => changeLayout('circle')}>circle</button>
        <button onClick={() => changeLayout('concentric')}>concentric</button>
        <button onClick={() => changeLayout('cose')}>cose</button>
        <button onClick={() => changeLayout('grid')}>grid</button>
        <button onClick={() => changeLayout('random')}>random</button>
      </div>
      <div>返信先: {selectedLabel}</div>
      <CytoscapeComponent
        elements={elements}
        cy={(cy: Cytoscape.Core) => {
          cyref.current = cy;
          initCytoscape(cy);
        }}
        layout={{ name: 'preset' }}
        wheelSensitivity={0.1}
        style={{ width: '600px', height: '600px' }}
      />
      <div>
        <button onClick={save}>保存</button> <button onClick={load}>復元</button>
      </div>
    </div>
  );
}

export default Graph;

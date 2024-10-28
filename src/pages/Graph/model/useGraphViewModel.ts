import Cytoscape from 'cytoscape';
import { useRef, useEffect } from 'react';
import { useGraph } from '../model/useGraph';

export const useGraphViewModel = () => {
  const cyref = useRef<Cytoscape.Core | null>(null);
  const { elements, initCytoscape, selectedLabel, save, load } = useGraph();

  const changeLayout = (layout: string) => {
    if (!cyref.current) return;
    cyref.current.layout(getLayoutOption(layout)).run();
  };
  const loadGraph = async () => {
    await load();
    if (!cyref.current) return;
    cyref.current.layout({ name: 'cose', animate: false }).run();
  };
  useEffect(() => {
    if (!cyref.current || elements.length > 10) return;
    cyref.current.layout({ name: 'breadthfirst' }).run();
  }, [elements]);
  return {
    elements,
    selectedLabel,
    loadGraph,
    save,
    breadthFirstHanlder: () => changeLayout('breadthfirst'),
    circleHandler: () => changeLayout('circle'),
    concentricHandler: () => changeLayout('concentric'),
    coseHandler: () => changeLayout('cose'),
    gridHandler: () => changeLayout('grid'),
    randomHandler: () => changeLayout('random'),
    cyHandler: (cy: Cytoscape.Core) => {
      cyref.current = cy;
      initCytoscape(cy);
    },
  };
};

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

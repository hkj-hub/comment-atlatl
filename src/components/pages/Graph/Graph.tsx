import Avatar from 'boring-avatars';
import Cytoscape from 'cytoscape';
import { useEffect, useRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { useGraph } from '@/hooks/useGraph';
import { CytoscapeComponent } from '@/shared/ui';
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
  const { elements, tapEventHandler, backgroundTapEventHandler, selectedLabel } = useGraph();

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
      <Avatar
        size={40}
        name="Hoge Huga"
        variant="beam"
        colors={['#FFBD87', '#FFD791', '#F7E8A6', '#D9E8AE', '#BFE3C0']}
      />
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
          cy.removeAllListeners();
          cy.on('tap', 'node', tapEventHandler);
          cy.on('tap', function (evt) {
            if (evt.target === cy) {
              backgroundTapEventHandler(evt);
            }
          });
          cy.style([
            {
              selector: 'node[label]',
              css: {
                shape: 'ellipse',
                content: 'data(label)',
                'background-image': (elm) => {
                  const data = elm.data();
                  if (data.type !== 'User') return undefined;
                  const svgString = encodeURIComponent(
                    renderToStaticMarkup(
                      <Avatar
                        size={40}
                        name={data.peerId}
                        variant="beam"
                        colors={['#FFBD87', '#FFD791', '#F7E8A6', '#D9E8AE', '#BFE3C0']}
                      />,
                    ),
                  );
                  const dataUri = `data:image/svg+xml,${svgString}`;
                  return dataUri;
                },
              },
            },
          ]);
        }}
        layout={{ name: 'preset' }}
        wheelSensitivity={0.1}
        style={{ width: '600px', height: '600px' }}
      />
    </div>
  );
}

export default Graph;

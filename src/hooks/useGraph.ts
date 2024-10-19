import Avatar from 'boring-avatars';
import Cytoscape from 'cytoscape';
import { useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { graphSelector, graphSlice } from '@/store/slices/graphSlice';

export const useGraph = () => {
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const elements = useAppSelector(graphSelector);
  const dispatch = useAppDispatch();
  const tapEventHandler = function (evt: Cytoscape.EventObject) {
    const node = evt.target;
    const data = node.data();
    if (data.type === 'User') {
      setSelectedLabel('');
      dispatch(graphSlice.actions.setSelectedId(null));
      return;
    }
    setSelectedLabel(data.label);
    dispatch(graphSlice.actions.setSelectedId(data.commentId));
  };
  const backgroundTapEventHandler = function () {
    setSelectedLabel('');
    dispatch(graphSlice.actions.setSelectedId(null));
  };
  const initCytoscape = (cy: Cytoscape.Core) => {
    cy.removeAllListeners();
    cy.on('tap', 'node', tapEventHandler);
    cy.on('tap', function (evt) {
      if (evt.target === cy) {
        backgroundTapEventHandler();
      }
    });
    cy.style(
      elements
        .filter((e) => e.data.type === 'User')
        .map((e) => ({
          selector: `node#${e.data.id}`,
          css: {
            content: 'data(label)',
            'background-image': (elm) => {
              const data = elm.data();
              const svgString = encodeURIComponent(
                renderToStaticMarkup(
                  Avatar({
                    size: 40,
                    name: data.peerId,
                    variant: 'beam',
                    colors: ['#FFBD87', '#FFD791', '#F7E8A6', '#D9E8AE', '#BFE3C0'],
                  }),
                ),
              );
              const dataUri = `data:image/svg+xml,${svgString}`;
              return dataUri;
            },
          },
        })),
    );
  };
  return { elements, tapEventHandler, selectedLabel, initCytoscape };
};

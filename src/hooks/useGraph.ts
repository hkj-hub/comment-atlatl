import Cytoscape from 'cytoscape';
import { useState } from 'react';
import { createCytoscapeStyle } from '@/domain/identicon/createCytoscapeStyle';
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
    cy.style([
      {
        selector: 'node',
        css: {
          content: 'data(label)',
          width: 20,
          height: 20,
        },
      },
      ...elements.filter((e) => e.data.type === 'User').map(createCytoscapeStyle),
    ]);
  };
  return { elements, tapEventHandler, selectedLabel, initCytoscape };
};

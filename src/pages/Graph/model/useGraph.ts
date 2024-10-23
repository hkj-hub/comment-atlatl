import Cytoscape from 'cytoscape';
import { useState } from 'react';
import { graphSelector, graphSlice } from '@/entities/graph';
import { featureFlag } from '@/shared/config/featureFlag';
import { useAppDispatch, useAppSelector } from '@/shared/store';
import { createCytoscapeStyle } from './createCytoscapeStyle';

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
    const style = featureFlag.useUserFeature
      ? [
          {
            selector: 'node',
            css: {
              content: 'data(label)',
              width: 20,
              height: 20,
            },
          },
          ...elements.filter((e) => e.data.type === 'User').map(createCytoscapeStyle),
        ]
      : elements.map(createCytoscapeStyle);
    cy.style(style);
  };
  return { elements, tapEventHandler, selectedLabel, initCytoscape };
};

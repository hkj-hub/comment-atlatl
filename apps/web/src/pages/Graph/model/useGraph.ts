import Cytoscape from 'cytoscape';
import { useEffect, useRef, useState } from 'react';
import { createCytoscapeStyle } from './createCytoscapeStyle';
import { joinP2PRoomActionForGraph } from './joinP2PRoomActionForGraph';
import { graphSelector, graphSlice } from '@/entities/graph';
import { loadCommentNodeAction, saveCommentNodeAction } from '@/features/comment/';
import { featureFlag } from '@/shared/config/featureFlag';
import { useAppDispatch, useAppSelector } from '@/shared/lib/store';

export const useGraph = () => {
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const elements = useAppSelector(graphSelector);
  const dispatch = useAppDispatch();
  const refFirstRef = useRef(true);
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && !refFirstRef.current) {
      return;
    }
    refFirstRef.current = false;
    dispatch(joinP2PRoomActionForGraph());
  }, [dispatch]);
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
  return {
    elements,
    tapEventHandler,
    selectedLabel,
    initCytoscape,
    save: () => dispatch(saveCommentNodeAction()),
    load: async () => dispatch(loadCommentNodeAction()),
  };
};

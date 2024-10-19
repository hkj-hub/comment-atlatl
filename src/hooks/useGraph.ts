import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { graphSelector, graphSlice } from '@/store/slices/graphSlice';

export const useGraph = () => {
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const elements = useAppSelector(graphSelector);
  const dispatch = useAppDispatch();
  const tapEventHandler = function (evt: cytoscape.EventObject) {
    const node = evt.target;
    const data = node.data();
    if (data.type === 'User') {
      setSelectedLabel('');
      dispatch(graphSlice.actions.setSelectedId(null));
      return;
    }
    setSelectedLabel(data.label);
    dispatch(graphSlice.actions.setSelectedId(node.id()));
  };
  const backgroundTapEventHandler = function (evt: cytoscape.EventObject) {
    setSelectedLabel('');
    dispatch(graphSlice.actions.setSelectedId(null));
  };
  return { elements, tapEventHandler, selectedLabel, backgroundTapEventHandler };
};

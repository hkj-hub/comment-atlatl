import React from 'react';
import { LayerHeight, LayerWidth, SimulaterProps } from '../../../domain/simulator/constants';
import ViewerBaseWrapper from './BaseWrapper';
import { TextProps } from '../../../domain/simulator/types';
import { RectTextDiv } from './components/RectTextDiv';
import RectDiv from './components/RectDiv';
import { convertTextPropsRapierToViewer } from '@/domain/simulator/converter';

const Viewer: React.FC<{ props: SimulaterProps; items: TextProps[] }> = ({ props, items }) => {
  return (
    <ViewerBaseWrapper width={LayerWidth} height={LayerHeight}>
      {items.map(convertTextPropsRapierToViewer).map((item, i) => (
        <RectTextDiv key={i} fontSize={props.textFrame.fontSize} {...item} />
      ))}
      {props.deviders.map((prop, i) => (
        <RectDiv key={i} {...prop} />
      ))}
    </ViewerBaseWrapper>
  );
};
export default Viewer;

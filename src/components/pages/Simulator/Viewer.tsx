import React from 'react';
import { convertTextPropsRapierToViewer } from '@/domain/simulator/converter';
import { LayerHeight, LayerWidth, SimulaterProps } from '../../../domain/simulator/constants';
import { TextProps } from '../../../domain/simulator/types';
import ViewerBaseWrapper from './BaseWrapper';
import RectDiv from './components/RectDiv';
import { RectTextDiv } from './components/RectTextDiv';

const Viewer: React.FC<{ props: SimulaterProps; items: TextProps[] }> = ({ props, items }) => {
  return (
    <ViewerBaseWrapper width={LayerWidth} height={LayerHeight}>
      {items.map(convertTextPropsRapierToViewer).map((item, i) => (
        <RectTextDiv key={`${item.text}-${i}`} fontSize={props.textFrame.fontSize} {...item} />
      ))}
      {props.deviders.map((prop, i) => (
        <RectDiv key={`${prop.position.x}-${i}`} {...prop} />
      ))}
    </ViewerBaseWrapper>
  );
};
export default Viewer;

import React from 'react';
import ViewerBaseWrapper from './BaseWrapper';
import RectDiv from './components/RectDiv';
import { RectTextDiv } from './components/RectTextDiv';
import type { TextProps } from '@/entities/simulator';
import {
  LayerHeight,
  LayerWidth,
  SimulaterProps,
  convertTextPropsRapierToViewer,
} from '@/entities/simulator';

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

import { positionToScale, toDegree } from './calc';
import { TextProps } from './types';

export const convertTextPropsRapierToViewer = (item: TextProps): TextProps => ({
  ...item,
  width: positionToScale(item.width),
  height: positionToScale(item.height),
  position: {
    x: positionToScale(item.position.x),
    y: positionToScale(item.position.y),
  },
  rotation: toDegree(item.rotation),
});

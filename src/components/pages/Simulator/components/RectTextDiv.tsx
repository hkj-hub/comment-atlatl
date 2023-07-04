import { positionToScale, toDegree } from '../../../../domain/simulator/calc';

export function RectTextDiv(props: {
  fontSize: number;
  text: string;
  width: number;
  height: number;
  position: { x: number; y: number };
  rotation?: number;
}) {
  const rotate = props.rotation ? `rotate(${toDegree(props.rotation)}deg)` : '';
  const width = positionToScale(props.width);
  const height = positionToScale(props.height);
  return (
    <div
      style={{
        fontSize: `${props.fontSize}px`,
        width: width,
        height: height,
        position: 'absolute',
        boxSizing: 'border-box',
        pointerEvents: 'none',
        border: 'none',
        transform: `translateX(${positionToScale(props.position.x) - width / 2}px) translateY(${
          -positionToScale(props.position.y) - height / 2
        }px) ${rotate}`,
      }}
    >
      {props.text}
    </div>
  );
}

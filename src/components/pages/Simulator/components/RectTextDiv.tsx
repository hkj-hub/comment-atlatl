
export function RectTextDiv(props: {
  fontSize: number;
  text: string;
  width: number;
  height: number;
  position: { x: number; y: number };
  rotation?: number;
}) {
  const rotate = props.rotation ? `rotate(${props.rotation}deg)` : '';
  const width = props.width;
  const height = props.height;
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
        transform: `translateX(${props.position.x - width / 2}px) translateY(${
          -props.position.y - height / 2
        }px) ${rotate}`,
      }}
    >
      {props.text}
    </div>
  );
}

// 壁
export default function RectDiv(props: {
  width: number;
  height: number;
  position: { x: number; y: number };
  rotate?: number;
}) {
  const rotate = props.rotate ? `rotate(${props.rotate}deg)` : '';
  return (
    <div
      style={{
        width: props.width,
        height: props.height,
        position: 'absolute',
        boxSizing: 'border-box',
        pointerEvents: 'none',
        border: 'solid 1px #000',
        transform: `translateX(${props.position.x - props.width / 2}px) translateY(${
          -props.position.y - props.height / 2
        }px) ${rotate}`,
      }}
    />
  );
}

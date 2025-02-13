import React from 'react';
const borderWidth = 2;

export default function ViewerBaseWrapper(props: {
  children: React.ReactNode;
  width?: number;
  height?: number;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}) {
  const { width: w = 500, height: h = 500 } = props;
  const corssBackgroundImage =
    `linear-gradient(to right, transparent,transparent ${
      w / 2 - borderWidth / 2
    }px, #000 , transparent ${w / 2 + borderWidth / 2}px, transparent)` +
    `,` +
    `linear-gradient(to top, transparent,transparent ${
      h / 2 - borderWidth / 2
    }px, #000 , transparent ${h / 2 + borderWidth / 2}px, transparent)`;
  return (
    <div
      style={{
        width: `${w}px`,
        height: `${h}px`,
        border: 'solid 1px #000',
        display: 'grid',
        placeItems: 'center',
        backgroundImage: corssBackgroundImage,
      }}
      onClick={props.onClick}
    >
      <div style={{ width: '0', height: '0', overflow: 'visible', position: 'relative' }}>
        {props.children}
      </div>
    </div>
  );
}

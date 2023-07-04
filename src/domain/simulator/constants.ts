export const SCALE = 100;
export const LayerWidth = 500;
export const LayerHeight = 500;
// 重力ベクトル (yのマイナス方向にかかる力)
export const gravity = { x: 0, y: -1.81 };

// テキスト追加時にかける力
export const forceVector = { x: -2, y: 1 };

// 壁の設定
export const deviderProps = {
  height: 40,
  width: LayerWidth,
  mass: 1,
  rotate: 0,
} as const;

export const simulaterProps = {
  textFrame: {
    fontSize: 16,
    width: 200,
    height: 50,
    density: 1,
    mass: 1,
    text: 'てすと',
  },
  deviders: [
    // 床
    {
      ...deviderProps,
      position: { x: 0, y: -deviderProps.width / 2 - deviderProps.height / 2 },
    },
    // 左の壁
    {
      ...deviderProps,
      position: { x: deviderProps.width / 2, y: 0 },
      rotate: -90,
    },
    // 右の壁
    {
      ...deviderProps,
      position: { x: -deviderProps.width / 2, y: 0 },
      rotate: 90,
    },
  ],
};
export type SimulaterProps = typeof simulaterProps;

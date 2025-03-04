import { SCALE } from './constants';

export const toRadian = (degree: number) => degree * (Math.PI / 180);
export const toDegree = (radian: number) => radian * (180 / Math.PI);

// SCALEで小さくしてシミュレーションした結果を描画用に引き延ばす
export const positionToScale = (i: number) => Math.floor(i * SCALE);

import { forceVector } from './constants';

export const getForce = (text: string) => {
  // @はここに来るまでに大文字の＠に置換されている前提
  if (text.includes('＠倍速')) {
    const count = (text.match(/＠倍速/g) || []).length;
    return { ...forceVector, x: forceVector.x * (count + 1) };
  }
  return undefined;
};

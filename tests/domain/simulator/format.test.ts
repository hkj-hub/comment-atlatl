import { formatText } from '@/domain/simulator/format';

describe('formatText', () => {
  test('@が＠に置換されること', () => {
    const ret = formatText('@@@');
    expect(ret).toBe('＠＠＠');
  });
});

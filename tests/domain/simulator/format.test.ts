import { formatText } from '@/shared/domain/simulator/format';

describe('formatText', () => {
  test('@が＠に置換されること', () => {
    const ret = formatText('@@@');
    expect(ret).toBe('＠＠＠');
  });
});

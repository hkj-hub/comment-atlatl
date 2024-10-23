import { formatText } from '@/pages/Simulator/model/domain/format';

describe('formatText', () => {
  test('@が＠に置換されること', () => {
    const ret = formatText('@@@');
    expect(ret).toBe('＠＠＠');
  });
});

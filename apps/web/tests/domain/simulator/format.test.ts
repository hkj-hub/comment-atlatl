import { formatText } from '@/entities/simulator/model/domain/format';

describe('formatText', () => {
  test('@が＠に置換されること', () => {
    const ret = formatText('@@@');
    expect(ret).toBe('＠＠＠');
  });
});

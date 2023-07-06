import Viewer from '@/components/pages/Simulator/Viewer';
import { simulaterProps } from '@/domain/simulator/constants';
import { render, screen } from '@testing-library/react';

test('テキストの表示', () => {
  const items = [
    {
      rotation: 0,
      position: { x: 0, y: 0 },
      width: 1,
      height: 1,
      text: 'テスト',
    },
  ];
  render(<Viewer props={simulaterProps} items={items} />);
  expect(screen.getByText('テスト')).toBeInTheDocument();
});

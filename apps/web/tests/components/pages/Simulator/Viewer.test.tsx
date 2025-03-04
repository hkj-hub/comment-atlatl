import { render, screen } from '@testing-library/react';
import Viewer from '@/pages/Simulator/ui/Viewer';
import { simulaterProps } from '@/entities/simulator/model/domain/constants';

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

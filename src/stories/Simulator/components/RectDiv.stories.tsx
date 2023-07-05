import ViewerBaseWrapper from '@/components/pages/Simulator/BaseWrapper';
import RectDiv from '@/components/pages/Simulator/components/RectDiv';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Simulator/components/RectDiv',
  component: RectDiv,
  args: { position: { x: 0, y: 0 }, width: 100, height: 100 },
  tags: ['autodocs'], // ドキュメント自動生成
  decorators: [
    (Story, context) => (
      <ViewerBaseWrapper>
        <Story {...context.args} />
      </ViewerBaseWrapper>
    ),
  ],
} satisfies Meta<typeof RectDiv>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const RightUp: Story = { args: { position: { x: 100, y: 100 }, width: 100, height: 100 } };
export const LeftUpRotate: Story = {
  args: { position: { x: -100, y: 100 }, width: 50, height: 50, rotate: 45 },
};

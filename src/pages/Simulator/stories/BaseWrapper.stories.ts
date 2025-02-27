import ViewerBaseWrapper from '../ui/BaseWrapper';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Simulator/BaseWrapper',
  component: ViewerBaseWrapper,
  args: { children: '(0,0)原点' },
  // tags: ['autodocs'], // ドキュメント自動生成
} satisfies Meta<typeof ViewerBaseWrapper>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

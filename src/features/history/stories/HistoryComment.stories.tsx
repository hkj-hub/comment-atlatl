import HistoryComment from '../ui/components/HistoryComment';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Simulator/components/HistoryComment',
  component: HistoryComment,
  args: { children: <>test</> },
  tags: ['autodocs'], // ドキュメント自動生成
} satisfies Meta<typeof HistoryComment>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

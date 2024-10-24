import { History } from '@/features/history';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Simulator/components/History',
  component: History,
  args: { children: <>test</> },
  tags: ['autodocs'], // ドキュメント自動生成
} satisfies Meta<typeof History>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

import UserAvatorIcon from './UserAvatorIcon';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Graph/UserAvatorIcon',
  component: UserAvatorIcon,
  args: { name: 'test' },
  // tags: ['autodocs'], // ドキュメント自動生成
} satisfies Meta<typeof UserAvatorIcon>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

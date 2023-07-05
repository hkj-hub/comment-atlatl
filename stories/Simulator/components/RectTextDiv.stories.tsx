import ViewerBaseWrapper from '@/components/pages/Simulator/BaseWrapper';
import { RectTextDiv } from '@/components/pages/Simulator/components/RectTextDiv';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Simulator/components/RectTextDiv',
  component: RectTextDiv,
  args: {
    position: { x: 0, y: 0 },
    width: 48,
    height: 22,
    fontSize: 16,
    text: 'てすと',
    rotation: 90,
  },
  tags: ['autodocs'], // ドキュメント自動生成
  decorators: [
    (Story, context) => (
      <ViewerBaseWrapper>
        <Story {...context.args} />
      </ViewerBaseWrapper>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: 'テキストを座標上に表示するコンポーネント',
      },
    },
  },
  argTypes: {
    rotation: {
      description: '傾き(deg)',
      table: {
        defaultValue: {
          summary: '0',
        },
      },
    },
  },
} satisfies Meta<typeof RectTextDiv>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

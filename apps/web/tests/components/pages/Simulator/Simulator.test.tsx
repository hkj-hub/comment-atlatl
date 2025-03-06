import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as SimulatorHooks from '@/pages/Simulator/model/simulatorHooks';
import Simulator from '@/pages/Simulator/ui/Simulator';

// モック作成準備
jest.mock('@/pages/Simulator/model/simulatorHooks');

const texts = [
  {
    rotation: 0,
    position: { x: 0, y: 0 },
    width: 1,
    height: 1,
    text: 'テスト',
  },
];

function mockSimulatorHooks(text: string) {
  const addText = jest.fn();
  const setText = jest.fn();
  const addEmotion = jest.fn();
  jest
    .spyOn(SimulatorHooks, 'useSimulatorHooks')
    .mockReturnValue({ texts, text, addText, setText, addEmotion });
  return { addText, setText };
}

test('初期状態で送信ボタンが非活性状態であること', () => {
  mockSimulatorHooks('');
  render(<Simulator />);
  expect(screen.getByRole('button', { name: '送信 📤' })).toBeDisabled();
});

test('文字が入力された状態で送信ボタンが活性状態であること', () => {
  mockSimulatorHooks('テスト');
  render(<Simulator />);
  expect(screen.getByRole('button', { name: '送信 📤' })).toBeEnabled();
});
describe('ボタンで送信', () => {
  test('文字が入力された状態で送信ボタンを押したときに送信されること', () => {
    const { addText } = mockSimulatorHooks('テスト');
    render(<Simulator />);
    screen.getByRole('button', { name: '送信 📤' }).click();
    expect(addText.mock.calls.length).toBe(1);
  });
});

describe('Enterで送信', () => {
  test('文字が入力された状態でEnterキーを押したときに送信されること', async () => {
    const { addText } = mockSimulatorHooks('テスト');
    render(<Simulator />);
    await userEvent.type(screen.getByRole('textbox'), '送信!{enter}');
    expect(addText.mock.calls.length).toBe(1);
  });

  test('文字が入力されていない状態でEnterキーを押したときに送信されないこと', async () => {
    const { addText } = mockSimulatorHooks('');
    render(<Simulator />);
    await userEvent.type(screen.getByRole('textbox'), '{enter}');
    expect(addText.mock.calls.length).toBe(0);
  });
});

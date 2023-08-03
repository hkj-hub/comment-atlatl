import Simulator from '@/components/pages/Simulator/Simulator';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// // モック作成準備
import * as SimulatorHooks from '@/hooks/simulatorHooks';
jest.mock('@/hooks/simulatorHooks');

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
test('文字が入力された状態で送信ボタンを押したときに送信されること', () => {
  const { addText } = mockSimulatorHooks('テスト');
  render(<Simulator />);
  screen.getByRole('button', { name: '送信 📤' }).click();
  expect(addText.mock.calls.length).toBe(1);
});
test('文字が入力された状態でEnterキーを押したときに送信されること', () => {
  const { addText } = mockSimulatorHooks('テスト');
  render(<Simulator />);
  userEvent.type(screen.getByRole('textbox'), '{Enter}');
  expect(addText.mock.calls.length).toBe(1);
});

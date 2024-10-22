import { useState } from 'react';
import { formatText } from '@/shared/domain/simulator/format';
import { useAppDispatch } from '@/shared/store/hooks';
import { sendMessageAction } from '@/shared/store/slices/p2pSlice';

export const useInputMessageHooks = () => {
  const dispatch = useAppDispatch();

  const [text, setText] = useState('');

  const addText = () => {
    if (text === '') return;
    const formattedText = formatText(text);
    dispatch(sendMessageAction(formattedText));
    setText('');
  };

  const addEmotion = (text: string) => {
    dispatch(sendMessageAction(text));
  };

  return { addText, setText, text, addEmotion };
};

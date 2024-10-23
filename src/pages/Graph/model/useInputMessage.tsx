import { useState } from 'react';
import { formatText } from '@/entities/simulator';
import { sendMessageAction } from '@/features/comment';
import { useAppDispatch } from '@/shared/store';

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

import { useEffect, useRef, useState } from 'react';
import {
  simulateLoop,
  simulator,
  getForce,
  formatText,
  simulatorSlice,
  textsSelector,
} from '@/entities/simulator';
import { sendMessageAction } from '@/features/comment';
import { useAppDispatch, useAppSelector } from '@/shared/store';

export const useSimulatorHooks = () => {
  const dispatch = useAppDispatch();
  const texts = useAppSelector(textsSelector);
  const loopRef = useRef<number>(0);
  useEffect(() => {
    loopRef.current = window.setInterval(() => {
      const texts = simulateLoop();
      dispatch(simulatorSlice.actions.setTexts(texts));
    }, 16);
    return () => {
      clearInterval(loopRef.current);
    };
  }, [dispatch, loopRef]);

  const [text, setText] = useState('');

  const addText = () => {
    if (text === '') return;
    const formattedText = formatText(text);
    const force = getForce(formattedText);
    simulator.addText({ text: formattedText, position: { x: 200, y: 200 }, force });
    dispatch(sendMessageAction(formattedText));
    setText('');
  };

  const addEmotion = (text: string) => {
    const force = getForce(text);
    simulator.addText({ text, position: { x: 200, y: 200 }, force });
    dispatch(sendMessageAction(text));
  };

  return { texts, addText, setText, text, addEmotion };
};

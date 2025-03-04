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
import { useAppDispatch, useAppSelector } from '@/shared/lib/store';
import { joinP2PRoomActionForSimulator } from './joinP2PRoomActionForSimulator';

export const useSimulatorHooks = () => {
  const dispatch = useAppDispatch();
  const texts = useAppSelector(textsSelector);
  const loopRef = useRef<number>(0);
  const refFirstRef = useRef(true);
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && !refFirstRef.current) {
      return;
    }
    refFirstRef.current = false;
    dispatch(joinP2PRoomActionForSimulator());
  }, [dispatch]);

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

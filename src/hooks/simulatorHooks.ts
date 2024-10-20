import { useEffect, useRef, useState } from 'react';
import { simulateLoop, simulator } from '../domain/simulator';
import { getForce } from '../domain/simulator/force';
import { formatText } from '../domain/simulator/format';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { textsSelector } from '../store/selector/simulatorSelector';
import { sendMessageAction } from '../store/slices/p2pSlice';
import { simulatorSlice } from '../store/slices/simulatorSlice';

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

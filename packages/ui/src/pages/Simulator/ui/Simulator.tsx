import React from 'react';
import { useSimulatorHooks } from '../model/simulatorHooks';
import Viewer from './Viewer';
import { InputMessage } from '@/entities/inputMessage';
import { simulaterProps } from '@/entities/simulator';

const Simulator: React.FC = () => {
  const { texts, addText, setText, text, addEmotion } = useSimulatorHooks();
  return (
    <div style={{ overflow: 'hidden' }}>
      <Viewer props={simulaterProps} items={texts} />
      <InputMessage setText={setText} addText={addText} addEmotion={addEmotion} text={text} />
    </div>
  );
};
export default Simulator;

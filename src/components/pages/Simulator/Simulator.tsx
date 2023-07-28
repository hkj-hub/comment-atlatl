import React from 'react';
import { useSimulatorHooks } from '../../../hooks/simulatorHooks';
import { simulaterProps } from '../../../domain/simulator/constants';
import Viewer from './Viewer';

const Simulator: React.FC = () => {
  const { texts, addText, setText, text } = useSimulatorHooks();
  return (
    <div style={{ overflow: 'hidden' }}>
      <Viewer props={simulaterProps} items={texts} />
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button disabled={text.length === 0} onClick={() => addText()}>
        {` 送信 📤`}
      </button>
    </div>
  );
};
export default Simulator;

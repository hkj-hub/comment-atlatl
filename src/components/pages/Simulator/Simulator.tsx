import React from 'react';
import { useSimulatorHooks } from '../../../hooks/simulatorHooks';
import { simulaterProps } from '../../../domain/simulator/constants';
import Viewer from './Viewer';

const emoteBtnStyle: React.CSSProperties = { marginLeft: '1rem', cursor: 'pointer' };
const Simulator: React.FC = () => {
  const { texts, addText, setText, text, addEmotion } = useSimulatorHooks();
  return (
    <div style={{ overflow: 'hidden' }}>
      <Viewer props={simulaterProps} items={texts} />
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.nativeEvent.isComposing || e.key !== 'Enter' || text.length === 0) return;
          addText();
        }}
      />
      <button disabled={text.length === 0} onClick={() => addText()}>{`送信 📤`}</button>
      <button title="ﾊﾟﾁﾊﾟﾁ" style={emoteBtnStyle} onClick={() => addEmotion('👏')}>{`👏`}</button>
      <button title="ｲｲﾈ" style={emoteBtnStyle} onClick={() => addEmotion('👍')}>{`👍`}</button>
      <button title="ﾐｰﾄｩｰ" style={emoteBtnStyle} onClick={() => addEmotion('🤝')}>{`🤝`}</button>
      <button title="ｽｷ" style={emoteBtnStyle} onClick={() => addEmotion('♡')}>{`♡`}</button>
    </div>
  );
};
export default Simulator;

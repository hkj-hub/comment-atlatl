import React from 'react';

const emoteBtnStyle: React.CSSProperties = { marginLeft: '1rem', cursor: 'pointer' };
type Props = {
  setText: (text: string) => void;
  addText: () => void;
  addEmotion: (text: string) => void;
  text: string;
};
export function Component({ setText, addText, text, addEmotion }: Props) {
  return (
    <div style={{ overflow: 'hidden' }}>
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
}

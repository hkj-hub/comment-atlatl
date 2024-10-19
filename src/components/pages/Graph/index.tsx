import React from 'react';
import { FaGithub } from 'react-icons/fa6';
import { InputMessage } from '@/entities/inputMessage';
import { useInputMessageHooks } from '@/hooks/useInputMessage';
import { History } from '../../../entities/history';
import Graph from './Graph';

const Page: React.FC = () => {
  const { addText, setText, text, addEmotion } = useInputMessageHooks();
  return (
    <>
      <InputMessage setText={setText} addText={addText} addEmotion={addEmotion} text={text} />
      <div style={{ display: 'flex' }}>
        <Graph />
        <History />
      </div>
      <a href="https://github.com/hkj-hub/comment-atlatl" target="_blank">
        <FaGithub />
      </a>
    </>
  );
};
export default Page;

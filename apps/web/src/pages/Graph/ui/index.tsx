import React from 'react';
import { FaGithub } from 'react-icons/fa6';
import { useInputMessageHooks } from '../model/useInputMessage';
import Graph from './Graph';
import { InputMessage } from '@/entities/inputMessage';
import { peerIdSelector } from '@/entities/p2p';
import { History } from '@/features/history';
import { useAppSelector } from '@/shared/lib/store';
import UserAvator from '@/shared/ui/identicon/UserAvatorIcon';

const Page: React.FC = () => {
  const { addText, setText, text, addEmotion } = useInputMessageHooks();
  const peerId = useAppSelector(peerIdSelector);
  return (
    <>
      <UserAvator name={peerId} />
      {peerId.slice(0, 4)}
      <InputMessage setText={setText} addText={addText} addEmotion={addEmotion} text={text} />
      <div className="sm:flex">
        <Graph />
        <History />
      </div>
      <a href="https://github.com/hkj-hub/comment-atlatl" target="_blank" rel="noreferrer">
        <FaGithub />
      </a>
    </>
  );
};
export default Page;

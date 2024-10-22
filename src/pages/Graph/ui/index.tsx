import React from 'react';
import { FaGithub } from 'react-icons/fa6';
import { InputMessage } from '@/entities/inputMessage';
import { History } from '@/features/history';
import { useInputMessageHooks } from '@/pages/Graph/model/useInputMessage';
import UserAvator from '@/shared/domain/identicon/UserAvatorIcon';
import { useAppSelector } from '@/shared/store/hooks';
import { peerIdSelector } from '@/shared/store/slices/p2pSlice';
import Graph from './Graph';

const Page: React.FC = () => {
  const { addText, setText, text, addEmotion } = useInputMessageHooks();
  const peerId = useAppSelector(peerIdSelector);
  return (
    <>
      <UserAvator name={peerId} />
      {peerId.slice(0, 4)}
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

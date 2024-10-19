import Avatar from 'boring-avatars';
import React from 'react';
import { FaGithub } from 'react-icons/fa6';
import { InputMessage } from '@/entities/inputMessage';
import { useInputMessageHooks } from '@/hooks/useInputMessage';
import { useAppSelector } from '@/store/hooks';
import { peerIdSelector } from '@/store/slices/p2pSlice';
import { History } from '../../../entities/history';
import Graph from './Graph';

const Page: React.FC = () => {
  const { addText, setText, text, addEmotion } = useInputMessageHooks();
  const peerId = useAppSelector(peerIdSelector);
  return (
    <>
      <Avatar
        size={40}
        name={peerId}
        variant="beam"
        colors={['#FFBD87', '#FFD791', '#F7E8A6', '#D9E8AE', '#BFE3C0']}
      />
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

import React from 'react';
import { FaGithub } from 'react-icons/fa6';
import Simulator from './Simulator';
import { History } from '@/features/history';

const Simulators: React.FC = () => {
  return (
    <>
      <div style={{ display: 'flex' }}>
        <Simulator />
        <History />
      </div>
      <a href="https://github.com/hkj-hub/comment-atlatl" target="_blank" rel="noreferrer">
        <FaGithub />
      </a>
    </>
  );
};
export default Simulators;

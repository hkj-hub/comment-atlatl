import React from 'react';
import { FaGithub } from 'react-icons/fa6';
import { History } from '../../../entities/history';
import Graph from './Graph';

const Page: React.FC = () => {
  return (
    <>
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

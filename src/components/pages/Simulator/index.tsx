import React from 'react';
import { FaGithub } from 'react-icons/fa6';
import Graph from './Graph';
import History from './History';
import Simulator from './Simulator';

const Simulators: React.FC = () => {
  return (
    <>
      <div style={{ display: 'flex' }}>
        <Simulator />
        <History />
      </div>
      <div>
        <Graph />
      </div>
      <a href="https://github.com/hkj-hub/comment-atlatl" target="_blank">
        <FaGithub />
      </a>
    </>
  );
};
export default Simulators;

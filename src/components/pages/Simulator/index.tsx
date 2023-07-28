import React from 'react';
import Simulator from './Simulator';
import History from './History';
const Simulators: React.FC = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Simulator />
      <History />
    </div>
  );
};
export default Simulators;

import { useAppSelector } from '@/store/hooks';
import { messageSelector } from '@/store/selector/messageSelector';
import React from 'react';

const History: React.FC = () => {
  const messages = useAppSelector(messageSelector);
  return (
    <div style={{ paddingLeft: '10px', maxWidth: '200px' }}>
      {messages.map(({ id, message }) => (
        <div key={id}>{message}</div>
      ))}
    </div>
  );
};
export default History;

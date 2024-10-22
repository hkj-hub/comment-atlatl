import React from 'react';
import { useAppSelector } from '@/shared/store/hooks';
import { messageSelector } from '@/shared/store/selector/messageSelector';
import HistoryComment from './History/HistoryComment';

const History: React.FC = () => {
  const messages = useAppSelector(messageSelector);
  return (
    <div style={{ paddingLeft: '10px', maxWidth: '200px' }}>
      {messages.map(({ id, message }) => (
        <HistoryComment key={id}>{message}</HistoryComment>
      ))}
    </div>
  );
};
export default History;

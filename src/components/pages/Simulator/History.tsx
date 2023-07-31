import { useAppSelector } from '@/store/hooks';
import { messageSelector } from '@/store/selector/messageSelector';
import React from 'react';
import HistoryComment from './components/History/HistoryComment';

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

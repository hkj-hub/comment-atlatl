import { HistoryComment } from '@comment-atlatl/ui/components';
import React from 'react';
import { messageSelector } from '@/entities/message';
import { useAppSelector } from '@/shared/lib/store';

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

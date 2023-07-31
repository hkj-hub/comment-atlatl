import React from 'react';
import styles from './HistoryComment.module.css';

const HistoryComment: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  return <div className={styles.comment}>{children}</div>;
};
export default HistoryComment;

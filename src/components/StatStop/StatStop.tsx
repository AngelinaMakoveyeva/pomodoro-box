import React from 'react';
import StopIcon from '../../Icons/StopIcon';
import styles from './statstop.module.css';
import classNames from 'classnames';
import { useAppSelector } from '../../hooks/hooks';

interface IStatStop {
  stopCount: number;
}

export function StatStop({ stopCount }: IStatStop) {
  const { isDark } = useAppSelector(state => state.theme);

  const stopClass = classNames(
    styles.stop,
    stopCount > 0 && styles.blue,
  );
  return (
    <div className={stopClass}>
      <div className={styles.desc}>
        <h3 className={`${styles.title} ${isDark ? styles.dark : ''}`}>Остановки</h3>
        <p className={`${styles.count} ${isDark ? styles.dark : ''}`}>{stopCount}</p>
      </div>
      <StopIcon />
    </div>
  )
}

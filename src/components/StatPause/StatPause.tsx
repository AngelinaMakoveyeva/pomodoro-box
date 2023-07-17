import React from 'react';
import styles from './statpause.module.css';
import PauseIcon from '../../Icons/PauseIcon';
import classNames from 'classnames';
import { useAppSelector } from '../../hooks/hooks';

interface IStatPause {
  pauseSec: number;
}

export function StatPause({ pauseSec }: IStatPause) {
  const { isDark } = useAppSelector(state => state.theme);

  const hour = Math.floor((pauseSec / 3600) % 60);
  const min = Math.floor((pauseSec / 60) % 60);
  const sec = pauseSec % 60;

  const hourMin = `${hour}ч ${min}м`;
  const minSec = `${min}м ${sec}с`;
  const timePause = hour < 1 ? minSec : hourMin;

  const pauseClass = classNames(
    styles.pause,
    pauseSec > 0 && styles.purple,
  );

  return (
    <div className={pauseClass}>
      <div className={styles.desc}>
        <h3 className={`${styles.title} ${isDark ? styles.dark : ''}`}>Время на паузе</h3>
        <p className={`${styles.minute} ${isDark ? styles.dark : ''}`}>{timePause}</p>
      </div>
      <PauseIcon />
    </div>
  )
}


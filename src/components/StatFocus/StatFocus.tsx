import React from 'react';
import styles from './statfocus.module.css';
import FocusIcon from '../../Icons/FocusIcon';
import classNames from 'classnames';
import { useAppSelector } from '../../hooks/hooks';

interface IStatFocus {
  pauseSec: number;
  workInSec: number;
}

export function StatFocus({pauseSec, workInSec}: IStatFocus) {
  const { isDark } = useAppSelector(state => state.theme);

  let focus = Math.floor(100 - (100 / workInSec * pauseSec));

  if (focus < 0 || isNaN(focus)) {
    focus = 0;
  }

  const focusClass = classNames(
    styles.focus,
    focus > 0 && styles.orange,
  )

  return (
    <div className={focusClass}>
      <div className={styles.desc}>
        <h3 className={`${styles.title} ${isDark ? styles.dark : ''}`}>Фокус</h3>
        <p className={`${styles.percent} ${isDark ? styles.dark : ''}`}>{focus}%</p>
      </div>
      <FocusIcon />
    </div>
  )
}


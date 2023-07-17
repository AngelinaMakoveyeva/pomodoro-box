import React from 'react';
import styles from './stopwatch.module.css';
import { animated } from 'react-spring';
import { Unit } from './Unit/Unit';
import SettingIcon from '../../../../Icons/SettingIcon';

interface IStopwatch {
  timerInSeconds: number;
  units: number[];
  isStarted: boolean;
  isPaused: boolean;
  isBreakPaused: boolean;
  isBreakStarted: boolean;
  handleClickAddMinute: () => void;
}
export function Stopwatch({units, handleClickAddMinute,  isStarted, isPaused, isBreakPaused, isBreakStarted }: IStopwatch) {

  return (
    <animated.div className={`
      ${styles.watch}
      ${(isStarted && !isPaused) ? styles.red : ''}
      ${(isBreakStarted && !isBreakPaused) ? styles.green : ''}
    `}
    >
      <div className={styles.root}>
        <span className={`${styles.unit} ${styles.unit_1}`}>
          <Unit unit={units[0]} />
        </span>

        <span className={`${styles.unit} ${styles.unit_2}`}>
          <Unit unit={units[1]} />
        </span>

        <span className={`${styles.unit} ${styles.unit_separator}`}>
          :
        </span>
        <span className={`${styles.unit} ${styles.unit_3}`}>
          <Unit unit={units[2]} />
        </span>

        <span className={`${styles.unit} ${styles.unit_4}`}>
          <Unit unit={units[3]} />
        </span>
      </div>
      <button className={styles.watchPlus} onClick={handleClickAddMinute}>
        <SettingIcon />
      </button>
    </animated.div>
  )
}

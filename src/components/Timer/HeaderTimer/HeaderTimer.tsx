import React from 'react';
import styles from './headertimer.module.css';
import { ITask } from '../../../store/slice/tasksSlice';

interface IHeaderTimer {
  task: ITask;
  isTimeToBreak: boolean;
  currentBreak: number;
  currentPomodoro: number;
  isStarted: boolean;
  isBreakStarted: boolean;
}

export function HeaderTimer({ task, isTimeToBreak, currentBreak, currentPomodoro, isStarted, isBreakStarted }: IHeaderTimer) {
  return (
    <div className={`
          ${styles.header}
          ${isStarted ? styles.red : ''}
          ${isBreakStarted ? styles.green : ''}
        `}
    >
      <h2 className={styles.title}>{task.title}</h2>
      {isTimeToBreak ?
        <span className={styles.number}>Перерыв {currentBreak + 1}</span> :
        <span className={styles.number}>Помидор {currentPomodoro}</span>
      }
    </div>
  )
}

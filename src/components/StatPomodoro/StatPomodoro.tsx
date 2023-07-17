import React from 'react';
import styles from './statpomodoro.module.css';
import PomodoroIcon from '../../Icons/PomodoroIcon';
import Pomodoros from '../../Icons/Pomodoros';
import { declinationOfNumber } from '../../utils/declinationOfNumber';

interface IStatPomodoro {
  pomodoroCount: number;
}

export function StatPomodoro({ pomodoroCount }: IStatPomodoro) {
  return (
    <div className={styles.pomodoro}>
      {pomodoroCount > 0 ?
        <>
          <div className={styles.img}>
            <Pomodoros />
            <span>x {pomodoroCount}</span>
          </div>
          <div className={styles.count}>
            <p>{pomodoroCount} {declinationOfNumber(pomodoroCount, ['помидор', 'помидора', 'помидоров'])}</p>
          </div>
        </>
        :
        <PomodoroIcon />
      }
    </div>
  )
}

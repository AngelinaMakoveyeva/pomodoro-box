import React from 'react';
import styles from './statday.module.css';
import { declinationOfNumber } from '../../utils/declinationOfNumber';

interface IStatDayProps {
  selectedDayName: string;
  workInSec: number;
}

export function StatDay({ selectedDayName, workInSec }: IStatDayProps) {

  const hour = Math.floor((workInSec / 3600) % 60);
  const min = Math.floor((workInSec / 60) % 60);
  const sec = workInSec % 60;
  
  const hourMin = `${hour} ${declinationOfNumber(hour, ['часа', 'часов', 'часов'])} ${min} ${declinationOfNumber(min, ['минуты', 'минут', 'минут'])}`;
  const minSec = `${min} ${declinationOfNumber(min, ['минуты', 'минут', 'минут'])} ${sec} ${declinationOfNumber(sec, ['секунды', 'секунд', 'секунд'])}`
  const timeString = hour < 1 ? minSec : hourMin

  return (
    <div className={styles.day}>
      <h3 className={styles.title}>{selectedDayName}</h3>
      {workInSec > 0 ?
        <p className={styles.descr}>Вы работали над задачами в&nbsp;течение
          <span className={styles.time}> {timeString}</span>
        </p> :
        <p className={styles.descr}>Нет данных</p>
      }
    </div>
  )
}


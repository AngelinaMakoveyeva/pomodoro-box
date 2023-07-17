import React, { useEffect, useState } from 'react';
import styles from './tasktimecounter.module.css';
import { useAppSelector } from '../../../hooks/hooks';

export function TaskTimeCounter() {
  const tasksList = useAppSelector(state => state.tasks.items);
  const durationPomodoro = useAppSelector(state => state.timer.durationPomodoro);
  const totalMinutes = tasksList.reduce((total, task) => total + task.pomodoros, 0) * durationPomodoro;

  const [timeCounter, setTimeCounter] = useState({
    hour: Math.floor(totalMinutes / 60),
    min: totalMinutes % 60,
  });

  useEffect(() => {
    setTimeCounter({
      hour: Math.floor(totalMinutes / 60),
      min: totalMinutes % 60,
    });
  }, [tasksList, totalMinutes, durationPomodoro]);

  return (
    <div className={styles.time}>
      {timeCounter.hour > 0 && <span>{timeCounter.hour} час </span>}
      {timeCounter.min > 0 && <span>{timeCounter.min} мин</span>}
    </div>
  )
}

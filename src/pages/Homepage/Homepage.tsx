import React from 'react';
import styles from './homepage.module.css'
import { RootState } from '../../store/store';
import { useAppSelector } from '../../hooks/hooks';
import { Timer } from '../../components/Timer';
import { Work } from '../../components/Work';

export function Homepage() {
  const tasksList = useAppSelector((state: RootState) => state.tasks.items);

  return (
    <div className={styles.container}>
      <Work />
      {tasksList.length > 0 && <Timer />}
    </div>
  )
}

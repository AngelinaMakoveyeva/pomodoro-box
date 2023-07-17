import React from 'react';
import styles from './work.module.css'
import { AddTasks, } from './AddTasks';
import { TaskList } from './TaskList';
import { TaskTimeCounter } from './TaskTimeCounter';

export function Work() {
  return (
    <div className={styles.work}>
      <h1 className={styles.title}>Ура! Теперь можно начать работать:</h1>
      <ul className={styles.list}>
        <li className={styles.item}>Выберите категорию и&nbsp;напишите название текущей задачи</li>
        <li className={styles.item}>Запустите таймер (&laquo;помидор&raquo;)</li>
        <li className={styles.item}>Работайте пока &laquo;помидор&raquo; не&nbsp;прозвонит</li>
        <li className={styles.item}>Сделайте короткий перерыв (3-5&nbsp;минут)</li>
        <li className={styles.item}>Продолжайте работать &laquo;помидор&raquo; за&nbsp;&laquo;помидором&raquo;, пока задача не&nbsp;будут выполнена. Каждые 4&nbsp;&laquo;помидора&raquo; делайте длинный перерыв (15-30&nbsp;минут).</li>
      </ul>
      <AddTasks />
      <TaskList />
      <TaskTimeCounter />
    </div>
  );
}

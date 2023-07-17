import React from "react";
import styles from './tasklist.module.css';
import { ITask } from "../../../store/slice/tasksSlice";
import { useAppSelector } from "../../../hooks/hooks";
import { Task } from "./Task";

export function TaskList() {
  const tasksList = useAppSelector(state => state.tasks.items);

  return (
    <ul className={styles.tasklist}>
      {tasksList.map((task: ITask) => (
        <Task
          key={task.id}
          task={task} />
      ))}
    </ul>
  );
}


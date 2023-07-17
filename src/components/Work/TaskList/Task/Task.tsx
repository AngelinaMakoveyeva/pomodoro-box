import { useContext, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import { ITask, renameTask } from "../../../../store/slice/tasksSlice";
import styles from './task.module.css'
import { currentContext } from "../../../../context/currentContext";
import { Menu } from "./Menu";

interface ITaskProps {
  task: ITask,
}
export function Task({ task }: ITaskProps) {
  const tasksList = useAppSelector(state => state.tasks.items);
  const [taskTitle, setTaskTitle] = useState(task.title);
  const dispatch = useAppDispatch();

  const { setCurrentTask } = useContext(currentContext);
  const { currentTask } = useContext(currentContext);
  const isTaskSelected = currentTask === tasksList.indexOf(task);
  const isStarted = useAppSelector(state => state.timer.isStarted);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.target.value);
  }

  const handleSubmit = (event: React.KeyboardEvent) => {
    if (event.code === 'Enter') {
      dispatch(renameTask({ id: task.id, title: taskTitle }));
    }
  }

  const handleCurrent = () => {
    if (isStarted) return;
    setCurrentTask(tasksList.indexOf(task));
  };

  return (
    <li className={`
      ${styles.item}
      ${isTaskSelected ? styles.selected : ''}
    `}>
      <div className={styles.block} onClick={handleCurrent}>
        <span className={styles.count}>{task.pomodoros}</span>
        <div>
          {task.completed ?
            <input
              className={styles.input}
              type="text"
              value={taskTitle}
              onChange={handleChange}
              onKeyPress={handleSubmit}
            />
            : <h2 className={styles.title}>{task.title}</h2>
          }
        </div>
      </div>
      <Menu task={task} />
    </li>
  )
}

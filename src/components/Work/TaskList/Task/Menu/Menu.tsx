import React, { useState } from "react";
import IncreaseIcon from "../../../../../Icons/IncreaseIcon";
import DecreaseIcon from "../../../../../Icons/DecreaseIcon";
import EditIcon from "../../../../../Icons/EditIcon";
import DeleteIcon from "../../../../../Icons/DeleteIcon";
import styles from "./menu.module.css";
import { useAppDispatch } from "../../../../../hooks/hooks";
import { decreaseTask, editTask, increaseTask } from "../../../../../store/slice/tasksSlice";
import { removeTask } from "../../../../../store/slice/tasksSlice";
import { ITask } from "../../../../../store/slice/tasksSlice";
import { Dropdown } from "../../../../../Dropdown";
import { Modal } from "../../../../../Modal";


interface IMenu {
  task: ITask;
  onClose?: () => void;
}
const NOOP = () => { };

export function Menu({ task, onClose = NOOP }: IMenu) {
  const dispatch = useAppDispatch();
  const [isModalOpened, setIsModalOpened] = useState(false);


  const handelIncreaseTask = () => {
    dispatch(increaseTask(task.id));
  }
  const handelDecreaseTask = () => {
    dispatch(decreaseTask(task.id));
  }
  const handelEditTask = () => {
    dispatch(editTask(task.id));
  }
  const handelRemoveTask = () => {
    dispatch(removeTask(task.id));
  }
  return (
    <Dropdown>
      <ul className={styles.list}>
        <li className={styles.item}>
          <button className={styles.btn} onClick={handelIncreaseTask}>
            <IncreaseIcon />
            Увеличить
          </button>
        </li>
        <li className={styles.item}>
          <button className={styles.btn} onClick={handelDecreaseTask} disabled={task.pomodoros === 1}>
            <DecreaseIcon />
            Уменьшить
          </button>
        </li>
        <li className={styles.item}>
          <button className={styles.btn} onClick={handelEditTask}>
            <EditIcon />
            Редактировать
          </button>
        </li>
        <li className={styles.item}>
          <button className={styles.btn} onClick={() => setIsModalOpened(true)}>
            <DeleteIcon />
            Удалить
          </button>
        </li>
      </ul>
      {isModalOpened &&
        <Modal onClose={() => setIsModalOpened(true)}>
          <button
            className={styles.close}
            onClick={() => { setIsModalOpened(false) }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.9115 13.8058L6.84406 18.9567L4.96166 17.0433L10.0291 11.8924L5.0675 6.84914L6.85992 5.02721L11.8215 10.0705L16.7673 5.04334L18.6497 6.95672L13.7039 11.9839L18.6655 17.0272L16.8731 18.8491L11.9115 13.8058Z" fill="#C4C4C4" />
            </svg>
          </button>
          <h3 className={styles.title}>Удалить задачу?</h3>

          <button
            className={styles.btnDelete}
            onClick={handelRemoveTask}
          >
            Удалить</button>

          <button
            className={styles.btnEsc}
            onClick={() => { setIsModalOpened(false) }}
          >
            Отмена</button>
        </Modal>
      }
    </Dropdown>
  )
}

import React, { FormEvent, useState } from "react";
import { nanoid } from "nanoid";
import styles from './addtasks.module.css'
import { addTask } from "../../../store/slice/tasksSlice";
import { useAppDispatch } from "../../../hooks/hooks";

export function AddTasks() {
  const [value, setValue] = useState('');
  const dispatch = useAppDispatch();

  const defaultTask = {
		id: nanoid(),
		title: value,
    completed: false,
    pomodoros: 1,
		finished: 0,
	};

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		setValue(event.target.value);
	}

	const handleSumbit = (event: FormEvent) => {
		event.preventDefault();
	}

  const handleAddTask = ((event: FormEvent) => {
    event.preventDefault();
    if (value !== '') {
			dispatch(addTask(defaultTask));
		}
		setValue('');
  });


  return (
      <form className={styles.form} onSubmit={handleSumbit}>
        <input
          className={styles.input}
          type="text"
          value={value}
          onChange={handleChange}
          placeholder='Название задачи'
        />
        <button
          onClick={handleAddTask}
          className={styles.btn}
          type='submit'
        >Добавить
        </button>
      </form>
  )
}

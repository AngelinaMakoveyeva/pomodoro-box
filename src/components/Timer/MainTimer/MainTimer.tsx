import React, { Dispatch, SetStateAction, useContext } from 'react';
import styles from './maintimer.module.css';
import { ITask } from '../../../store/slice/tasksSlice';
import { currentContext } from '../../../context/currentContext';
import { StopwatchControl } from './StopwatchControl';
import { Stopwatch } from './Stopwatch';
import { getFormatedTimer } from '../../../utils/getFormatedTimer';

interface IMainTimer {
  task: ITask;
  isTimeToBreak: boolean;
  isPaused: boolean;
  isStarted: boolean;
  isBreakPaused: boolean;
  isBreakStarted: boolean;
  timerInSeconds: number;
  handleCompleteBreak: () => void;
  handleCompleteTask: () => void;
  setTimerInSeconds: Dispatch<SetStateAction<number>>;
  handleClickAddMinute:() => void;
}

export function MainTimer(props: IMainTimer) {
  const {
    task,
    isPaused,
    isStarted,
    isBreakPaused,
    isBreakStarted,
    timerInSeconds,
    isTimeToBreak,
    handleCompleteBreak,
    handleCompleteTask,
    setTimerInSeconds,
    handleClickAddMinute
  } = props;

  const { currentTask } = useContext(currentContext);

  return (
    <div className={styles.main}>
      <Stopwatch
        timerInSeconds={timerInSeconds}
        isStarted={isStarted}
        isPaused={isPaused}
        isBreakPaused={isBreakPaused}
        isBreakStarted={isBreakStarted}
        handleClickAddMinute={handleClickAddMinute}
        units={getFormatedTimer(timerInSeconds)}
      />

      <p className={styles.text}><span className={styles.task}>Задача {currentTask + 1} - </span>{task.title}</p>

      <StopwatchControl
        handleCompleteBreak={handleCompleteBreak}
        handleCompleteTask={handleCompleteTask}
        isTimeToBreak={isTimeToBreak}
        isStarted={isStarted}
        isPaused={isPaused}
        isBreakStarted={isBreakStarted}
        isBreakPaused={isBreakPaused}
        setTimerInSeconds={setTimerInSeconds}
      />
    </div>
  )
}

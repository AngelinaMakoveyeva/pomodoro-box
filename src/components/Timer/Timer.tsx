import React, { useContext, useEffect, useState } from 'react';
import styles from './timer.module.css'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { currentContext } from '../../context/currentContext';
import { HeaderTimer } from './HeaderTimer';
import { MainTimer } from './MainTimer';
import { finishTask, removeTask } from '../../store/slice/tasksSlice';
import { increaseBreaksCounter } from '../../store/slice/breaksSlice';
import { increaseStatPauseSec, increaseStatPomodoroCounter, increaseStatStopCount, increaseStatWorkSec } from '../../store/slice/statSlice';
import { setIsBreakPaused, setIsBreakStarted, setIsPaused, setIsStarted, setIsTimeToBreak } from '../../store/slice/timerSlice';
import { toast } from 'react-toastify';

const soundNotice = require('../../assets/sound/notification.mp3');

export function Timer() {
  const tasksList = useAppSelector(state => state.tasks.items);
  const breaksCounter = useAppSelector(state => state.breaks.breakCounter);
  const pomodoroInMin = useAppSelector(state => state.timer.durationPomodoro);
  const smallBreak = useAppSelector(state => state.timer.smallBreakTime);
  const largeBreak = useAppSelector(state => state.timer.largeBreakTime);
  const isPaused = useAppSelector(state => state.timer.isPaused);
  const isStarted = useAppSelector(state => state.timer.isStarted);
  const isTimeToBreak = useAppSelector(state => state.timer.isTimeToBreak);
  const isBreakStarted = useAppSelector(state => state.timer.isBreakStarted);
  const isBreakPaused = useAppSelector(state => state.timer.isBreakPaused);

  const [pomodoroInMinTime, setPomodoroInMinTime] = useState(pomodoroInMin);
  const [smallBreakTime, setSmallBreakTime] = useState(smallBreak);
  const [largeBreakTime, setLargeBreakTime] = useState(largeBreak);

  const [task, setTask] = useState(tasksList[0]);
  const [currentPomodoro, setCurrentPomodoro] = useState(1);
  const [currentBreak, setCurrentBreak] = useState(breaksCounter);

  const [timerInSeconds, setTimerInSeconds] = useState(pomodoroInMin * 60);
  const [breakInMin, setBreakInMin] = useState(breaksCounter === 3 ? largeBreakTime : smallBreakTime);

  const dispatch = useAppDispatch();
  const { currentTask } = useContext(currentContext);
  const Sound = new Audio(soundNotice);

  useEffect(() => {
    setTimerInSeconds(pomodoroInMin * 60)
  }, [pomodoroInMin]);

  useEffect(() => {
    setTask(tasksList[currentTask] || tasksList[0])
  }, [currentTask, tasksList]);

  //Таймер
  useEffect(() => {
    let timerId = setInterval(() => {

      //Если запущен таймер
      if ((isStarted && !isPaused && timerInSeconds > 0) || (isBreakStarted && !isBreakPaused && timerInSeconds > 0)) {
        setTimerInSeconds(timerInSeconds - 1);

        //Записываем в статистику рабочее время
        if (!isTimeToBreak) {
          dispatch(increaseStatWorkSec());
        }
      }

      //Если на паузе
      if (isPaused) {
        dispatch(increaseStatPauseSec());
      }

      //Если время задачи закончиоось
      if (isStarted && timerInSeconds === 0) {
        handleCompleteTask();
      }

      //Если время перерыва закончиоось
      if (isBreakStarted && timerInSeconds === 0) {
        handleCompleteBreak();
      }
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [isStarted, isPaused, isBreakStarted, isBreakPaused, isTimeToBreak, timerInSeconds, pomodoroInMin, pomodoroInMinTime]);

  // задача закончилась
  function handleCompleteTask() {
    //Сбрасываем таймер
    dispatch(setIsPaused(false));
    dispatch(setIsStarted(false));
    setTimerInSeconds(breakInMin * 60);
    setBreakInMin(breaksCounter === 3 ? largeBreakTime : smallBreakTime)
    dispatch(setIsTimeToBreak(true));
    Sound.play();
    toast.success(
      <div className={styles.notification}>
        Помидор окончен, можно сделать перерыв.
      </div>
    );

    //Если задача из нескольких помидорок
    if (currentPomodoro === task.pomodoros) {
      dispatch(removeTask(task.id));
      setCurrentPomodoro(1);
    } else {
      setCurrentPomodoro(currentPomodoro + 1);
    }

    dispatch(finishTask(task.id));
    dispatch(increaseStatPomodoroCounter());
  }

  function handleCompleteBreak() {
    //Сбрасываем таймер
    dispatch(setIsBreakPaused(false));
    dispatch(setIsBreakStarted(false));
    dispatch(setIsTimeToBreak(false));
    setTimerInSeconds(pomodoroInMin * 60);
    dispatch(increaseBreaksCounter());
    dispatch(increaseStatStopCount());
    Sound.play();
    toast.success(
      <div className={styles.notification}>
        Перерыв окончен.
      </div>)
  }

  const handleClickAddMinute = () => {
    if (isStarted && !isPaused) {
      setTimerInSeconds(timerInSeconds + 60)
    }
  }

  return (
    <div className={styles.timer}>
      <HeaderTimer
        task={task}
        isBreakStarted={isBreakStarted}
        isTimeToBreak={isTimeToBreak}
        currentBreak={currentBreak}
        currentPomodoro={currentPomodoro}
        isStarted={isStarted}
      />
      <MainTimer
        timerInSeconds={timerInSeconds}
        task={task}
        isTimeToBreak={isTimeToBreak}
        setTimerInSeconds={setTimerInSeconds}
        handleCompleteBreak={handleCompleteBreak}
        handleCompleteTask={handleCompleteTask}
        isPaused={isPaused}
        isStarted={isStarted}
        isBreakPaused={isBreakPaused}
        isBreakStarted={isBreakStarted}
        handleClickAddMinute={handleClickAddMinute}
      />
    </div>
  )
}

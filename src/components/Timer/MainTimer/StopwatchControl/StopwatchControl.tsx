import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import styles from './stopwatchcontrol.module.css';
import classNames from 'classnames';
import { increaseStatStopCounter } from '../../../../store/slice/statSlice';
import { setIsBreakPaused, setIsBreakStarted, setIsPaused, setIsStarted } from '../../../../store/slice/timerSlice';

interface IStopwatchControl {
	name: string,
	onClick: () => void,
	disabled: boolean
}

interface IStopwatchControlProps {
	isTimeToBreak: boolean;
	setTimerInSeconds: React.Dispatch<React.SetStateAction<number>>;
	handleCompleteBreak: () => void;
	handleCompleteTask: () => void;
	isPaused: boolean;
	isStarted: boolean;
	isBreakPaused: boolean;
	isBreakStarted: boolean;
}

export function StopwatchControl(props: IStopwatchControlProps) {
	const {
		isTimeToBreak,
		setTimerInSeconds,
		handleCompleteBreak,
		handleCompleteTask,
		isPaused,
		isStarted,
		isBreakPaused,
		isBreakStarted
	} = props

	const pomodoroInMin = useAppSelector(state => state.timer.durationPomodoro);
	const dispatch = useAppDispatch();

	function handleStart() {
		if (isTimeToBreak) {
			dispatch(setIsBreakStarted(true));
		} else {
			dispatch(setIsStarted(true));
		}
	}

	function handleStop() {
		dispatch(setIsStarted(false));
		setTimerInSeconds(pomodoroInMin * 60);
		dispatch(increaseStatStopCounter());
	}

	function handlePause() {
		if (isTimeToBreak) {
			dispatch(setIsBreakPaused(true));
		} else {
			dispatch(setIsPaused(true));
		}
	}

	function handleResume() {
		if (isTimeToBreak) {
			dispatch(setIsBreakPaused(false));
		} else {
			dispatch(setIsPaused(false));
		}
	}

	let firstButton: IStopwatchControl = {
		name: 'Старт',
		onClick: handleStart,
		disabled: false,
	}

	let secondButton: IStopwatchControl = {
		name: isTimeToBreak ? 'Пропустить' : 'Стоп',
		onClick: isTimeToBreak ? handleCompleteBreak : handleStop,
		disabled: !isTimeToBreak,
	}

	if (isPaused || isBreakPaused) {
		firstButton = {
			name: 'Продолжить',
			onClick: handleResume,
			disabled: false,
		}

		secondButton = {
			name: isTimeToBreak ? 'Пропустить' : 'Сделано',
			onClick: isTimeToBreak ? handleCompleteBreak : handleCompleteTask,
			disabled: false,
		}
	} else if (isStarted || isBreakStarted) {
		firstButton = {
			name: 'Пауза',
			onClick: handlePause,
			disabled: false,
		}
		secondButton = {
			name: isTimeToBreak ? 'Пропустить' : 'Стоп',
			onClick: isTimeToBreak ? handleCompleteBreak : handleStop,
			disabled: false,
		}
	}

	const btnR = classNames(
		styles.btn,
		styles.red
	);

	const btnL = classNames(
		styles.btn,
		styles.green
	);

	return (
		<div className={styles.containerBtn}>
			<button
				className={btnL}
				onClick={firstButton.onClick}
				disabled={firstButton.disabled}
			>
				{firstButton.name}
			</button>
			<button
				className={btnR}
				onClick={secondButton.onClick}
				disabled={secondButton.disabled}
			>
				{secondButton.name}
			</button>
		</div >
	)
}

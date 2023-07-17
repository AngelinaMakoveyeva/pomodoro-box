import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface ITimerState {
  durationPomodoro: number;
  smallBreakTime: number;
  largeBreakTime: number;
  isPaused: boolean;
  isStarted: boolean;
  isTimeToBreak: boolean;
  isBreakStarted: boolean;
  isBreakPaused: boolean;
}

const initialTimerState: ITimerState = {
  durationPomodoro: 25,
  smallBreakTime: 5,
  largeBreakTime: 30,
  isPaused: false,
  isStarted: false,
  isTimeToBreak: false,
  isBreakStarted: false,
  isBreakPaused: false,
};

export const timerSlice = createSlice({
  name: "timer",
  initialState: initialTimerState,

  reducers: {
    setStateDurationPomodoro: (state, action: PayloadAction<number>) => {
      state.durationPomodoro = action.payload;
    },
    setStateSmallBreakTime: (state, action: PayloadAction<number>) => {
      state.smallBreakTime = action.payload;
    },
    setStateLargeBreakTime: (state, action: PayloadAction<number>) => {
      state.largeBreakTime = action.payload;
    },
    setIsPaused: (state, action: PayloadAction<boolean>) => {
      state.isPaused = action.payload;
    },
    setIsStarted: (state, action: PayloadAction<boolean>) => {
      state.isStarted = action.payload;
    },
    setIsTimeToBreak: (state, action: PayloadAction<boolean>) => {
      state.isTimeToBreak = action.payload;
    },
    setIsBreakStarted: (state, action: PayloadAction<boolean>) => {
      state.isBreakStarted = action.payload;
    },
    setIsBreakPaused: (state, action: PayloadAction<boolean>) => {
      state.isBreakPaused = action.payload;
    },
  },
});

export const {
  setStateDurationPomodoro,
  setStateLargeBreakTime,
  setStateSmallBreakTime,
  setIsBreakPaused,
  setIsBreakStarted,
  setIsPaused,
  setIsStarted,
  setIsTimeToBreak,
} = timerSlice.actions;

export const timer = (state: RootState) => state.timer;

export default timerSlice.reducer;

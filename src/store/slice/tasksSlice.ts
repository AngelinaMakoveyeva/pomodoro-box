import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type ITask = {
  id: string;
  title: string;
  completed: boolean;
  pomodoros: number;
  finished: number;
};

interface ITasksState {
  items: ITask[];
}

const initialTasksState: ITasksState = {
  items: [],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: initialTasksState,
  reducers: {
    addTask: (state, action: PayloadAction<ITask>) => {
      state.items.push(action.payload);
    },
    removeTask: (state, action: PayloadAction<string>) => {
      let id = action.payload;
      state.items = state.items.filter((item) => {
        return item.id !== id;
      });
    },
    increaseTask: (state, action: PayloadAction<string>) => {
      let id = action.payload;
      let findTask = state.items.find((task) => task.id === id);
      if (findTask) {
        findTask.pomodoros++;
      }
    },
    decreaseTask: (state, action: PayloadAction<string>) => {
      let id = action.payload;
      let findTask = state.items.find((task) => task.id === id);
      if (findTask) {
        findTask.pomodoros--;
      }
    },
    editTask: (state, action: PayloadAction<string>) => {
      let id = action.payload;
      let findTask = state.items.find((task) => task.id === id);
      if (findTask) {
        findTask.completed = true;
      }
    },
    renameTask: (
      state,
      action: PayloadAction<{ id: string; title: string }>
    ) => {
      let { id, title } = action.payload;
      let findTask = state.items.find((task) => task.id === id);
      if (findTask) {
        findTask.completed = false;
        findTask.title = title;
      }
    },
    finishTask: (state, action: PayloadAction<string>) => {
      let id = action.payload;
      let findTask = state.items.find((task) => task.id === id);
      if (findTask) {
        findTask.finished++;
      }
    },
    indexTask: (state, action: PayloadAction<string>) => {
      let id = action.payload;
      state.items.findIndex((task) => task.id === id);
    },
  },
});

export const {
  addTask,
  removeTask,
  increaseTask,
  decreaseTask,
  editTask,
  renameTask,
  indexTask,
  finishTask,
} = tasksSlice.actions;

export const tasks = (state: RootState) => state.tasks;

export default tasksSlice.reducer;

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import tasksReducer from './slice/tasksSlice';
import timerReducer from './slice/timerSlice';
import breaksReducer from './slice/breaksSlice';
import statReducer from './slice/statSlice';
import themeReducer from './slice/themeSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  timer: timerReducer,
  breaks: breaksReducer,
  stat: statReducer,
  theme: themeReducer,
});

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
// persistor.purge();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

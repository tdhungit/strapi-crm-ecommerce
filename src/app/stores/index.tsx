import { configureStore } from '@reduxjs/toolkit';
import warehouseReducer from './warehouseSlice';

const store = configureStore({
  reducer: {
    warehouse: warehouseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

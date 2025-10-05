import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import warehouseReducer from './warehouseSlice';

const store = configureStore({
  reducer: {
    warehouse: warehouseReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

import { WarehouseType } from '@/lib/settings';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface WarehouseState {
  warehouse: WarehouseType | null;
}

const initialState: WarehouseState = {
  warehouse: null,
};

const warehouseSlice = createSlice({
  name: 'warehouse',
  initialState,
  reducers: {
    setWarehouseStore: (state, action: PayloadAction<WarehouseType>) => {
      state.warehouse = action.payload;
    },
    clearWarehouseStore: (state) => {
      state.warehouse = null;
    },
  },
});

export const { setWarehouseStore, clearWarehouseStore } =
  warehouseSlice.actions;
export default warehouseSlice.reducer;

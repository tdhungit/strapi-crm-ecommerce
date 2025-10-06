import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  user: any;
  token: string | null;
}

const initialState: UserState = {
  user: null,
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserStore: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    clearUserStore: (state) => {
      state.user = null;
    },
    setTokenStore: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    clearTokenStore: (state) => {
      state.token = null;
    },
  },
});

export const { setUserStore, clearUserStore, setTokenStore, clearTokenStore } =
  userSlice.actions;
export default userSlice.reducer;

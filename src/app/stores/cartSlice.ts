import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  cartQty: number;
  photos: any[];
  sku: string;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items:
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('cart') || '[]')
      : [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        existing.cartQty += item.cartQty;
      } else {
        state.items.push(item);
      }
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    updateQty: (
      state,
      action: PayloadAction<{ id: number; cartQty: number }>
    ) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) item.cartQty = action.payload.cartQty;
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem('cart');
    },
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
  },
});

export const { addToCart, removeFromCart, updateQty, clearCart, setCart } =
  cartSlice.actions;
export default cartSlice.reducer;

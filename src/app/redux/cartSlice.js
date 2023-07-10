import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addProduct: (state, action) => {
      const { _id } = action.payload;
      const index = state.items.findIndex((item) => item.product._id === _id);
      if (index === -1) {
        state.items.push({
          product: action.payload,
          quantity: 1,
        });
      } else {
        state.items[index].quantity++;
      }
    },

    removeProduct: (state, action) => {
      const _id = action.payload;
      const index = state.items.findIndex((item) => item.product._id == _id);
      state.items.splice(index, 1);
    },

    incQuantity: (state, action) => {
      const _id = action.payload;
      const index = state.items.findIndex((item) => item.product._id == _id);
      state.items[index].quantity++;
    },

    decQuantity: (state, action) => {
      const _id = action.payload;
      const index = state.items.findIndex((item) => item.product._id == _id);
      state.items[index].quantity > 1
        ? state.items[index].quantity--
        : state.items.splice(index, 1);
    },

    reset: (state, action) => {
      state.items = [];
    },
  },
});

export const { addProduct, removeProduct, incQuantity, decQuantity, reset } = cartSlice.actions;
export default cartSlice;

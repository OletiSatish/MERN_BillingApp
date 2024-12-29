import { createSlice } from '@reduxjs/toolkit';
import { SET_ITEMS, ADD_ITEM, REMOVE_ITEM, UPDATE_ITEM, SET_ITEM_ERROR, RESET_ITEM_STATE } from '../types';

const initialState = {
  items: [],
  error: null,
};

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    [SET_ITEMS]: (state, action) => {
      state.items = action.payload;
      state.error = null;
    },
    [ADD_ITEM]: (state, action) => {
      state.items.push(action.payload);
      state.error = null;
    },
    [REMOVE_ITEM]: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.error = null;
    },
    [UPDATE_ITEM]: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
        state.error = null;
      }
    },
    [SET_ITEM_ERROR]: (state, action) => {
      state.error = action.payload;
    },
    [RESET_ITEM_STATE]: (state) => {
      state.items = [];
      state.error = null;
    },
  },
});

export const { setItems, addItem, removeItem, updateItem, setItemError, resetItemState } = itemSlice.actions;

export default itemSlice.reducer;

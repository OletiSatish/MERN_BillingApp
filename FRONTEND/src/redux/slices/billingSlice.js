import { createSlice } from '@reduxjs/toolkit';
import { SET_BILLING, CALCULATE_BILL, GENERATE_INVOICE, SET_BILLING_ERROR, RESET_BILLING_STATE } from '../types';

const initialState = {
  billing: null,
  total: 0,
  error: null,
};

const billingSlice = createSlice({
  name: 'billing',
  initialState,
  reducers: {
    [SET_BILLING]: (state, action) => {
      state.billing = action.payload;
      state.error = null;
    },
    [CALCULATE_BILL]: (state, action) => {
      state.total = action.payload;
    },
    [GENERATE_INVOICE]: (state, action) => {
      // Logic for generating invoice (could include PDF or email generation)
      state.error = null;
    },
    [SET_BILLING_ERROR]: (state, action) => {
      state.error = action.payload;
    },
    [RESET_BILLING_STATE]: (state) => {
      state.billing = null;
      state.total = 0;
      state.error = null;
    },
  },
});

export const { setBilling, calculateBill, generateInvoice, setBillingError, resetBillingState } = billingSlice.actions;

export default billingSlice.reducer;

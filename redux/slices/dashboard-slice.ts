import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: 0,
  orders: 0,
  totalAmount: 0,
  loading: true,
  error: false,
};

export const dashboardSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
    },
    setOrders(state, action) {
      state.orders = action.payload;
    },
    setTotalAmount (state,action) {
      state.totalAmount = action.payload
    }
  },
});
export const { setUsers, setOrders,setTotalAmount } = dashboardSlice.actions;

export default dashboardSlice.reducer;

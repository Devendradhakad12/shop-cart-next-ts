import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  address: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("address")! || "{}") : {} //JSON.parse(localStorage.getItem("address")!)! || {}
};
const useraddressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setUseraddress(state, action) {
      state.address = action.payload.address;
    },
  },
});

export const { setUseraddress } = useraddressSlice.actions;

export default useraddressSlice.reducer;
 
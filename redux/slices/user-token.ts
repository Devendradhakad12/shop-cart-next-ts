import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  user: {},
};
const userTokenSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setUserToken(state, action) {
      (state.token = action.payload.token), (state.user = action.payload.user);
    },
    logoutUserToken(state) {
      (state.token = ""), (state.user = {});
    },
  },
});

export const {setUserToken,logoutUserToken} = userTokenSlice.actions;

export default userTokenSlice.reducer;

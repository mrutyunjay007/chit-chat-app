import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  email: "",
  password: "",
};

const signUpSlice = createSlice({
  name: "signUpInfo",
  initialState,
  reducers: {
    signUpData(state, action) {
      state.fullName = action.payload.fullName;
      state.password = action.payload.password;
    },
    signUpDataEmail(state, action) {
      state.email = action.payload.email;
    },
  },
});

export const { signUpData, signUpDataEmail } = signUpSlice.actions;
export default signUpSlice.reducer;

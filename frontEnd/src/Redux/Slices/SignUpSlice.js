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
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
  },
});

export const { signUpData } = signUpSlice.actions;
export default signUpSlice.reducer;

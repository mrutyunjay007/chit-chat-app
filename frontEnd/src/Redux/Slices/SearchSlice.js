import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchElement: null,
  seachedUser: null,
};

const searchSlice = createSlice({
  name: "searchInfo",
  initialState,
  reducers: {
    ConnectionElememtFromSearch(state, action) {
      state.searchElement = action.payload;
    },

    RemoveSearchedElement(state) {
      state.searchElement = null;
    },

    SearchingUser(state, action) {
      state.seachedUser = action.payload;
    },
    RemoveSearchedUser(state) {
      state.seachedUser = null;
    },
  },
});

export const {
  ConnectionElememtFromSearch,
  RemoveSearchedElement,
  SearchingUser,
  RemoveSearchedUser,
} = searchSlice.actions;

export default searchSlice.reducer;

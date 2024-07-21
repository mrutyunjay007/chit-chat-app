import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchElement: null,
  seachedUser: null,
  searchAct: false,
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
    ActOfSearching(state, action) {
      state.searchAct = action.payload;
    },
  },
});

export const {
  ConnectionElememtFromSearch,
  RemoveSearchedElement,
  SearchingUser,
  RemoveSearchedUser,
  ActOfSearching,
} = searchSlice.actions;

export default searchSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { fetchTweets } from "../tweets/tweetsSlice";
import { fetchUsers } from "../users/usersSlice";

type InitialState = {
  isLoading: boolean;
};

const initialState: InitialState = {
  isLoading: false,
};

const isLoadingSlice = createSlice({
  name: "isLoading",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchTweets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTweets.fulfilled, (state) => {
        state.isLoading = false;
      });
  },
});

export default isLoadingSlice.reducer;

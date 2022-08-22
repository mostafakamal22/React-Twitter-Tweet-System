import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  authedUser: string | null;
};

const initialState: InitialState = {
  authedUser: null,
};

export const AUTHED_ID = "tylermcginnis";

const authedUserSlice = createSlice({
  name: "authedUser",
  initialState,
  reducers: {
    setAuthedUser: (state, action) => {
      state.authedUser = action.payload;
    },
  },
});

export default authedUserSlice.reducer;

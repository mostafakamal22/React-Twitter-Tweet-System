import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getInitialData } from "../../../utils/api";

type UserObj = {
  id: string;
  name: string;
  avatarURL: string;
  tweets: string[];
};

type InitialState =
  | {
      users: { [userName: string]: UserObj };
    }
  | {
      users: {};
    };

const initialState: InitialState = {
  users: {},
};

// Generates pending, fulfilled and rejected action types
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const { users } = await getInitialData();
    return users;
  } catch (error) {
    console.log(error.message);
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.users = {};
      })
      .addCase(
        fetchUsers.fulfilled,
        (state, action: PayloadAction<InitialState>) => {
          state.users = { ...action.payload };
        }
      );
  },
});

export default usersSlice.reducer;

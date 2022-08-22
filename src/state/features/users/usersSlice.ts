import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getInitialData } from "../../../utils/api";

type UserObj = {
  id: string;
  name: string;
  avatarURL: string;
  tweets: string[];
};

type User = {
  userName: UserObj;
};
type InitialState = {
  users: User[];
};

const initialState: InitialState = {
  users: [],
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
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.users = action.payload;
      }
    );
  },
});

export default usersSlice.reducer;

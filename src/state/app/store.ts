import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../features/users/usersSlice";
import tweetsReducer from "../features/tweets/tweetsSlice";
import authedUserReducer from "../features/authedUser/authedUserSlice";
import isLoadingReducer from "../features/isLoading/isLoadingSlice";

const store = configureStore({
  reducer: {
    users: usersReducer,
    tweets: tweetsReducer,
    authedUser: authedUserReducer,
    isLoading: isLoadingReducer,
  },
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

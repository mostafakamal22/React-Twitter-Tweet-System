import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import NewTweet from "./NewTweet";
import TweetPage from "./TweetPage";
import Nav from "./Nav";
import { LoadingSpinner } from "./LoadingSpinner";
import { useAppDispatch, useAppSelector } from "../state/app/hooks";
import { fetchTweets } from "../state/features/tweets/tweetsSlice";
import { fetchUsers } from "../state/features/users/usersSlice";
import {
  setAuthedUser,
  AUTHED_ID,
} from "../state/features/authedUser/authedUserSlice";

const App = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.isLoading);

  useEffect(() => {
    dispatch(fetchTweets());
    dispatch(fetchUsers());
    dispatch(setAuthedUser(AUTHED_ID));
  }, []);

  return (
    <Router>
      <>
        <div className="container">
          <Nav />
          {!isLoading ? (
            <Routes>
              <Route path="/twitter-tweet-system/" element={<Dashboard />} />
              <Route
                path="/twitter-tweet-system/tweet/:id"
                element={<TweetPage />}
              />
              <Route path="/twitter-tweet-system/new" element={<NewTweet />} />
            </Routes>
          ) : (
            <LoadingSpinner />
          )}
        </div>
      </>
    </Router>
  );
};

export default App;

import React, { useReducer, useEffect } from "react";
import { getInitialData } from "../../../utils/api";
import { TweetContext } from "./tweetsContext";
import { receiveTweets } from "../../actions/tweets";
import tweets from "../../reducers/tweets/tweetsReducer";

export const TweetsState = ({ children }) => {
  const [state, dispatch] = useReducer(tweets, {});

  useEffect(() => {
    getInitialData().then(({ tweets }) => {
      dispatch(receiveTweets(tweets));
    });
  }, []);

  return (
    <TweetContext.Provider value={state}>{children}</TweetContext.Provider>
  );
};

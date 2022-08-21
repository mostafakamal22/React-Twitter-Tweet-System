import React, { useReducer, useEffect, useContext } from "react";
import { getInitialData } from "../../../utils/api";
import { TweetContext } from "./tweetsContext";
import { LoadingContext } from "../loading/loadingContext";
import { receiveTweets } from "../../actions/tweets";
import tweets from "../../reducers/tweets/tweetsReducer";
import { startLoading, stopLoading } from "../../actions/loading";

export const TweetsState = ({ children }) => {
  const [tweetsData, dispatch] = useReducer(tweets, {});

  const { dispatchLoading } = useContext(LoadingContext);

  useEffect(() => {
    dispatchLoading(startLoading());
    getInitialData().then(({ tweets }) => {
      dispatch(receiveTweets(tweets));
      dispatchLoading(stopLoading());
    });
  }, []);

  return (
    <TweetContext.Provider value={{ tweetsData, dispatch }}>
      {children}
    </TweetContext.Provider>
  );
};

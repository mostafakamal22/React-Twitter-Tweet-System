import React, { useContext, useMemo } from "react";
import Tweet from "./Tweet";
import { TweetContext } from "../state/contexts/tweets/tweetsContext";

export const Dashboard = () => {
  let tweets = useContext(TweetContext);
  const sortedTweets = useMemo(() =>
    Object.keys(tweets).sort(
      (a, b) => tweets[b].timestamp - tweets[a].timestamp,
      [tweets]
    )
  );

  return (
    <div>
      <h3 className="center">Your Timeline</h3>
      <ul className="dashboard-list">
        {sortedTweets.map((id) => (
          <li key={id}>
            <Tweet id={id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;

import React, { useContext, useMemo } from "react";
import Tweet from "./Tweet";
import { TweetContext } from "../state/contexts/tweets/tweetsContext";

export const Dashboard = (): JSX.Element => {
  let { tweetsData } = useContext(TweetContext);
  const sortedTweets = useMemo(
    () =>
      Object.keys(tweetsData).sort(
        (a, b) => tweetsData[b].timestamp - tweetsData[a].timestamp
      ),
    [tweetsData]
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

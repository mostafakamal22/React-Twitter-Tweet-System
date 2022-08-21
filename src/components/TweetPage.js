import React, { useContext, useMemo } from "react";
import Tweet from "./Tweet";
import NewTweet from "./NewTweet";
import { TweetContext } from "../state/contexts/tweets/tweetsContext";

export const TweetPage = (props) => {
  const { id } = props.match.params;
  const tweets = useContext(TweetContext);
  const replies = useMemo(
    () =>
      !tweets[id]
        ? []
        : tweets[id].replies.sort(
            (a, b) => tweets[b].timestamp - tweets[a].timestamp
          ),
    [tweets]
  );

  return (
    <div>
      <Tweet id={id} />
      <NewTweet id={id} />
      {replies.length !== 0 && <h3 className="center">Replies</h3>}

      <ul>
        {replies.map((replyId) => (
          <li key={replyId}>
            <Tweet id={replyId} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TweetPage;

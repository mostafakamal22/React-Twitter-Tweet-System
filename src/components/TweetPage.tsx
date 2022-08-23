import React, { useMemo } from "react";
import Tweet from "./Tweet";
import NewTweet from "./NewTweet";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../state/app/hooks";

export const TweetPage = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const { tweets } = useAppSelector((state) => state.tweets);

  const replies = useMemo(
    () =>
      tweets[id!]
        ? [...tweets[id!].replies].sort(
            (a: any, b: any) => tweets[b].timestamp - tweets[a].timestamp
          )
        : [],
    [tweets]
  );

  return (
    <div>
      <Tweet id={id!} />
      <NewTweet id={id!} />
      {replies.length !== 0 && <h3 className="center">Replies</h3>}

      <ul>
        {replies.map((replyId: string) => (
          <li key={replyId}>
            <Tweet id={replyId} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TweetPage;

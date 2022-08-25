import React, { useMemo } from "react";
import { formatTweet, formatDate } from "../utils/helpers";
import {
  TiArrowBackOutline,
  TiHeartOutline,
  TiHeartFullOutline,
} from "react-icons/ti/index";
import { Link, useNavigate } from "react-router-dom";
import { saveLikeToggle } from "../utils/api";
import { useAppDispatch, useAppSelector } from "../state/app/hooks";
import { toggleTweet } from "../state/features/tweets/tweetsSlice";
import ProfileImage from "./ProfileImage";

type TweetTypes = {
  id: string;
};

export const Tweet = ({ id }: TweetTypes): JSX.Element => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.users);
  const { authedUser } = useAppSelector((state) => state.authedUser);
  const { tweets } = useAppSelector((state) => state.tweets);

  const parentTweet = tweets[id] ? tweets[tweets[id].replyingTo] : null;

  const tweet = useMemo(
    () =>
      tweets[id] && users[tweets[id].author]
        ? formatTweet(
            tweets[id],
            users[tweets[id].author],
            authedUser,
            parentTweet
          )
        : null,
    [users, tweets, authedUser]
  );

  const handleLike = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();

    //toggle tweet in state
    dispatch(
      toggleTweet({
        id: tweet?.id,
        hasLiked: tweet?.hasLiked,
        authedUser,
      })
    );

    //toggle tweet in the backend too
    saveLikeToggle({
      id: tweet?.id,
      hasLiked: tweet?.hasLiked,
      authedUser,
    }).catch((e) => {
      console.warn("Error in handleToggleTweet: ", e);
      dispatch(
        toggleTweet({
          id: tweet?.id,
          hasLiked: tweet?.hasLiked,
          authedUser,
        })
      );
      alert("The was an error liking the tweet. Try again.");
    });
  };

  let navigate = useNavigate();

  const toParent = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ): void => {
    e.preventDefault();
    navigate(`/twitter-tweet-system/tweet/${id}`);
  };

  if (tweet === null) {
    return <p>This Tweet doesn't existd</p>;
  }

  const { name, avatar, timestamp, text, hasLiked, likes, replies, parent } =
    tweet;

  return (
    <Link to={`/tweet/${tweet.id}`} className="tweet">
      <ProfileImage src={avatar} alt={`Avatar of ${name}`} />
      {/* <img src={avatar} alt={`Avatar of ${name}`} className="avatar" /> */}
      <div className="tweet-info">
        <div>
          <span>{name}</span>
          <div>{formatDate(timestamp)}</div>
          {parent && (
            <button
              className="replying-to"
              onClick={(e) => toParent(e, parent.id)}
            >
              Replying to @{parent.author}
            </button>
          )}
          <p>{text}</p>
        </div>
        <div className="tweet-icons">
          <TiArrowBackOutline className="tweet-icon" />
          <span>{replies !== 0 && replies}</span>
          <button className="heart-button" onClick={(e) => handleLike(e)}>
            {hasLiked === true ? (
              <TiHeartFullOutline color="#e0245e" className="tweet-icon" />
            ) : (
              <TiHeartOutline className="tweet-icon" />
            )}
          </button>
          <span>{likes !== 0 && likes}</span>
        </div>
      </div>
    </Link>
  );
};

export default Tweet;

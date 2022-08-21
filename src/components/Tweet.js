import React, { useContext, useMemo } from "react";
import { formatTweet, formatDate } from "../utils/helpers";
import {
  TiArrowBackOutline,
  TiHeartOutline,
  TiHeartFullOutline,
} from "react-icons/ti/index";
import { Link, useHistory } from "react-router-dom";
import { TweetContext } from "../state/contexts/tweets/tweetsContext";
import { AuthedUserContext } from "../state/contexts/authedUser/authedUserContext";
import { UsersContext } from "../state/contexts/users/usersContext";
import { toggleTweet } from "../state/actions/tweets";
import { saveLikeToggle } from "../utils/api";

export const Tweet = ({ id }) => {
  const { tweetsData, dispatch } = useContext(TweetContext);
  const users = useContext(UsersContext);
  const authedUser = useContext(AuthedUserContext);
  const parentTweet = tweetsData[id]
    ? tweetsData[tweetsData[id].replyingTo]
    : null;

  const tweet = useMemo(
    () =>
      tweetsData[id]
        ? formatTweet(
            tweetsData[id],
            users[tweetsData[id].author],
            authedUser,
            parentTweet
          )
        : null,
    [users, tweetsData, authedUser]
  );

  const handleLike = (e) => {
    e.preventDefault();

    //toggle tweet in state
    dispatch(
      toggleTweet({
        id: tweet.id,
        hasLiked: tweet.hasLiked,
        authedUser,
      })
    );

    //toggle tweet in the backend too
    saveLikeToggle({
      id: tweet.id,
      hasLiked: tweet.hasLiked,
      authedUser,
    }).catch((e) => {
      console.warn("Error in handleToggleTweet: ", e);
      dispatch(
        toggleTweet({
          id: tweet.id,
          hasLiked: tweet.hasLiked,
          authedUser,
        })
      );
      alert("The was an error liking the tweet. Try again.");
    });
  };

  let history = useHistory();

  const toParent = (e, id) => {
    e.preventDefault();
    history.push(`/tweet/${id}`);
  };

  if (tweet === null) {
    return <p>This Tweet doesn't existd</p>;
  }

  const { name, avatar, timestamp, text, hasLiked, likes, replies, parent } =
    tweet;

  return (
    <Link to={`/tweet/${tweet.id}`} className="tweet">
      <img src={avatar} alt={`Avatar of ${name}`} className="avatar" />
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

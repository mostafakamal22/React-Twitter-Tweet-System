import React, { useContext, useMemo } from "react";
import { formatTweet, formatDate } from "../utils/helpers";
import {
  TiArrowBackOutline,
  TiHeartOutline,
  TiHeartFullOutline,
} from "react-icons/ti/index";
import { Link } from "react-router-dom";
import { TweetContext } from "../state/contexts/tweets/tweetsContext";
import { AuthedUserContext } from "../state/contexts/authedUser/authedUserContext";
import { UsersContext } from "../state/contexts/users/usersContext";

export const Tweet = ({ id }) => {
  const tweets = useContext(TweetContext);
  const users = useContext(UsersContext);
  const authedUser = useContext(AuthedUserContext);
  const parentTweet = tweets[id] ? tweets[tweets[id].replyingTo] : null;

  const tweet = useMemo(
    () =>
      tweets[id]
        ? formatTweet(
            tweets[id],
            users[tweets[id].author],
            authedUser,
            parentTweet
          )
        : null,
    [users, tweets, authedUser]
  );

  // handleLike = (e) => {
  //   e.preventDefault();

  //   const { dispatch, tweet, authedUser } = this.props;

  //   dispatch(
  //     handleToggleTweet({
  //       id: tweet.id,
  //       hasLiked: tweet.hasLiked,
  //       authedUser,
  //     })
  //   );
  // };
  // toParent = (e, id) => {
  //   e.preventDefault();
  //   this.props.history.push(`/tweet/${id}`);
  // };

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
            <button className="replying-to" onClick={(e) => e.preventDefault()}>
              Replying to @{parent.author}
            </button>
          )}
          <p>{text}</p>
        </div>
        <div className="tweet-icons">
          <TiArrowBackOutline className="tweet-icon" />
          <span>{replies !== 0 && replies}</span>
          <button className="heart-button" onClick={(e) => e.preventDefault()}>
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

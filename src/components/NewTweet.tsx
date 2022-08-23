import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { saveTweet } from "../utils/api";
import { useAppDispatch, useAppSelector } from "../state/app/hooks";
import { addTweet } from "../state/features/tweets/tweetsSlice";

type NewTweetProps = {
  id?: string;
};

export const NewTweet = ({ id }: NewTweetProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const { authedUser } = useAppSelector((state) => state.authedUser);

  const [text, setText] = useState("");
  const [toHome, setToHome] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    saveTweet({
      text,
      author: authedUser,
      replyingTo: id,
    }).then((tweet) => {
      dispatch(addTweet(tweet));
    });

    setToHome(id ? false : true);
    setText("");
  };

  if (toHome === true) {
    return <Navigate to="/" />;
  }

  const tweetLeft = 280 - text.length;
  return (
    <div>
      <h3 className="center">Compose new Tweet</h3>
      <form className="new-tweet" onSubmit={(e) => handleSubmit(e)}>
        <textarea
          placeholder="What's happening?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="textarea"
          maxLength={280}
        />
        {tweetLeft <= 100 && <div className="tweet-length">{tweetLeft}</div>}
        <button className="btn" type="submit" disabled={text === ""}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewTweet;

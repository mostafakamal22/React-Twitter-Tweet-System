import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { addTweet } from "../state/actions/tweets";
import { TweetContext } from "../state/contexts/tweets/tweetsContext";
import { AuthedUserContext } from "../state/contexts/authedUser/authedUserContext";
import { saveTweet } from "../utils/api";

export const NewTweet = ({ id }) => {
  const { dispatch } = useContext(TweetContext);
  const authedUser = useContext(AuthedUserContext);
  const [text, setText] = useState("");
  const [toHome, setToHome] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    saveTweet({
      text,
      author: authedUser,
      replyingTo: id,
    }).then((tweet) => dispatch(addTweet(tweet)));

    setText("");
    setToHome(id ? false : true);
  };

  if (toHome === true) {
    return <Redirect to="/" />;
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

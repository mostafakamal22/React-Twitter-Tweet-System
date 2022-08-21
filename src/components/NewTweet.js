import React, { useState } from "react";
import { Redirect } from "react-router-dom";

export const NewTweet = () => {
  const [text, setText] = useState("");
  const [toHome, setToHome] = useState(false);

  if (toHome === true) {
    return <Redirect to="/" />;
  }

  const tweetLeft = 280 - text.length;
  return (
    <div>
      <h3 className="center">Compose new Tweet</h3>
      <form className="new-tweet" onSubmit={(e) => e.preventDefault()}>
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

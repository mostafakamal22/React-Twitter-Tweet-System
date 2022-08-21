import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import NewTweet from "./NewTweet";
import TweetPage from "./TweetPage";
import Nav from "./Nav";

export const App = () => {
  return (
    <Router>
      <>
        <div className="container">
          <Nav />

          <div>
            <Route path="/" exact component={Dashboard} />
            <Route path="/tweet/:id" component={TweetPage} />
            <Route path="/new" component={NewTweet} />
          </div>
        </div>
      </>
    </Router>
  );
};

export default App;

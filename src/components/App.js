import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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

          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="/tweet/:id" element={<TweetPage />} />
            <Route path="/new" element={<NewTweet />} />
          </Routes>
        </div>
      </>
    </Router>
  );
};

export default App;

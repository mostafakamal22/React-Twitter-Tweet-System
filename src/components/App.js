import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import NewTweet from "./NewTweet";
import TweetPage from "./TweetPage";
import Nav from "./Nav";
import { LoadingContext } from "../state/contexts/loading/loadingContext";
import { LoadingSpinner } from "./LoadingSpinner";

export const App = () => {
  const { isLoading } = useContext(LoadingContext);

  return (
    <Router>
      <>
        <div className="container">
          <Nav />
          {!isLoading ? (
            <Routes>
              <Route index element={<Dashboard />} />
              <Route path="/tweet/:id" element={<TweetPage />} />
              <Route path="/new" element={<NewTweet />} />

              <Route index element={<NewTweet />} />
            </Routes>
          ) : (
            <LoadingSpinner />
          )}
        </div>
      </>
    </Router>
  );
};

export default App;

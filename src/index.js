import React from "react";
import "./index.css";
import App from "./components/App";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { UsersState } from "./state/contexts/users/UsersState";
import { TweetsState } from "./state/contexts/tweets/TweetsState";
import { AuthedUsersState } from "./state/contexts/authedUser/AuthedUserState";
import { LoadingState } from "./state/contexts/loading/LoadingState";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <LoadingState>
      <UsersState>
        <TweetsState>
          <AuthedUsersState>
            <App />
          </AuthedUsersState>
        </TweetsState>
      </UsersState>
    </LoadingState>
  </StrictMode>
);

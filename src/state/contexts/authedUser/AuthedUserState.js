import React, { useReducer, useEffect } from "react";
import { AUTHED_ID, setAuthedUser } from "../../actions/authedUser";
import authedUser from "../../reducers/authedUser/authedUserReducer";
import { AuthedUserContext } from "./authedUserContext";

export const AuthedUsersState = ({ children }) => {
  const [state, dispatch] = useReducer(authedUser, null);

  useEffect(() => {
    dispatch(setAuthedUser(AUTHED_ID));
  }, []);

  return (
    <AuthedUserContext.Provider value={state}>
      {children}
    </AuthedUserContext.Provider>
  );
};

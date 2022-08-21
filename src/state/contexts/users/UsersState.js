import React, { useReducer, useEffect } from "react";
import { receiveUsers } from "../../actions/users";
import users from "../../../reducers/users";
import { getInitialData } from "../../../utils/api";
import { UsersContext } from "./usersContext";

export const UsersState = ({ children }) => {
  const [state, dispatch] = useReducer(users, {});

  useEffect(() => {
    getInitialData().then(({ users }) => {
      dispatch(receiveUsers(users));
    });
  }, []);

  return (
    <UsersContext.Provider value={state}>{children}</UsersContext.Provider>
  );
};

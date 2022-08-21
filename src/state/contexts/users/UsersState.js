import React, { useReducer, useEffect, useContext } from "react";
import { receiveUsers } from "../../actions/users";
import users from "../../reducers/users/usersReducer";
import { getInitialData } from "../../../utils/api";
import { UsersContext } from "./usersContext";
import { startLoading, stopLoading } from "../../actions/loading";
import { LoadingContext } from "../loading/loadingContext";

export const UsersState = ({ children }) => {
  const [state, dispatch] = useReducer(users, {});

  const { dispatchLoading } = useContext(LoadingContext);

  useEffect(() => {
    dispatchLoading(startLoading());
    getInitialData().then(({ users }) => {
      dispatch(receiveUsers(users));
      dispatchLoading(stopLoading());
    });
  }, []);

  return (
    <UsersContext.Provider value={state}>{children}</UsersContext.Provider>
  );
};

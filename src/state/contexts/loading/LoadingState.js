import React, { useReducer } from "react";
import loading from "../../reducers/loading/loadingReducer";
import { LoadingContext } from "./loadingContext";

export const LoadingState = ({ children }) => {
  const [isLoading, dispatchLoading] = useReducer(loading, false);

  return (
    <LoadingContext.Provider value={{ isLoading, dispatchLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

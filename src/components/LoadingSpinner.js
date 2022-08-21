import React from "react";
import { HashLoader } from "react-spinners";

export const LoadingSpinner = () => {
  return (
    <div>
      <HashLoader style={{ margin: "0 auto" }} color="#0052B4" size={150} />
    </div>
  );
};

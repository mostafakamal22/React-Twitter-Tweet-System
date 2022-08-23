import React, { CSSProperties } from "react";
import { HashLoader } from "react-spinners";

const override: CSSProperties = {
  display: "block",
  margin: "auto",
  height: "75vh",
};

export const LoadingSpinner = (): JSX.Element => {
  return (
    <div>
      <HashLoader cssOverride={override} color="#0052B4" size={150} />
    </div>
  );
};

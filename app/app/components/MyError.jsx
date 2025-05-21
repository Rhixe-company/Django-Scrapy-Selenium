import React from "react";

const MyError = ({ error }) => {
  return (
    <div>
      <h1>There was an error!!!</h1>
      <p>{error}</p>
    </div>
  );
};

export default MyError;

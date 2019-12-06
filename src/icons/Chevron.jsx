import React from "react";

const Chevron = props => {
  const { fill } = props;
  return (
    <svg viewBox="0 0 24 24">
      <path
        fill={fill ? fill : "none"}
        d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
      />
      <path fill="none" d="M0 0h24v24H0z" />
    </svg>
  );
};

export default Chevron;

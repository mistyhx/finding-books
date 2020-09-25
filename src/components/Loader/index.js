import React from "react";
import "./index.scss";

const Loader = () => {
  return (
    <div className="loader">
      <div className="loader-book">
        <figure></figure>
        <figure></figure>
        <figure></figure>
      </div>
      {/*<div>Loading ...</div>*/}
    </div>
  );
};

export default Loader;

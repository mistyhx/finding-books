import React from "react";
import Coffee from "../../assets/Coffee";
import "./index.scss";

const Loader = () => {
  return (
    <div className="loader">
      <ul className="loader-bubbles">
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <div className="coffee">
        <Coffee />
      </div>
    </div>
  );
};

export default Loader;

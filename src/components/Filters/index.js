import React from "react";
import { ChevronDown } from "react-feather";
import "./index.scss"

const Filters = () => {
  return (
    <div className="filters">
      <div>
        <span>Sort by relevance</span>
        <ChevronDown size={16} />
      </div>
      <div>
        <span>Publish date </span>
        <ChevronDown size={16} />
      </div>
      <div>
        <span> Categories </span>
        <ChevronDown size={16} />
      </div>
    </div>
  );
};

export default Filters;

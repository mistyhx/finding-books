import React, { useReducer } from "react";
import { ChevronDown } from "react-feather";
import "./index.scss";

const sorting = ["relevance", "newest"];
const filtering = ["partial", "full", "free-ebooks", "paid-ebooks", "ebooks"];
const printType = ["all", "books", "magazines"];

const FilterMenu = ({ options }) => {
  return (
    <div className="filters-menu">
      <div className="filters-menu-selected">
        <span>By relevance</span>
        <ChevronDown size={16} />
      </div>
      <div className="filters-menu-options">
        {options.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    </div>
  );
};

const Filters = () => {
  return (
    <div className="filters">
      <FilterMenu type="sorting" options={sorting} />
      <FilterMenu type="filtering" options={filtering} />
      <FilterMenu type="print" options={printType} />
    </div>
  );
};

export default Filters;

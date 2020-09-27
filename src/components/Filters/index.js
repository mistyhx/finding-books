import React, { useReducer } from "react";
import { ChevronDown } from "react-feather";
import "./index.scss";

const sorting = ["relevance", "newest"];
const printType = ["all", "books", "magazines"];

const FilterMenu = ({ type, options }) => {
  const initialFilters = {
    sorting: "relevance",
    type: "all",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "UPDATE_SORT":
        return {
          sorting: action.payload,
          type: state.type,
        };

      case "UPDATE_TYPE":
        return {
          sorting: state.sorting,
          type: action.payload,
        };
    }
  };

  const [state, dispatch] = useReducer(reducer, initialFilters);

  return (
    <div className="filters-menu">
      <div className="filters-menu-selected">
        <span>{type === "sorting" ? `By ${state.sorting}` : state.type}</span>
        <ChevronDown size={16} />
      </div>
      <div className="filters-menu-options">
        {options.map((item, index) => (
          <div
            key={index}
            onClick={() => dispatch({ type: type === "sorting" ? "UPDATE_SORT" : "UPDATE_TYPE", payload: item })}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

const Filters = () => {
  return (
    <div className="filters">
      <FilterMenu type="sorting" options={sorting} />
      <FilterMenu type="print" options={printType} />
    </div>
  );
};

export default Filters;

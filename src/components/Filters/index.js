import React, { useReducer, useEffect } from "react";
import { ChevronDown } from "react-feather";
import "./index.scss";

const sorting = ["relevance", "newest"];
const format = ["all", "books", "magazines"];

const FilterMenu = ({ filterType, options, onSelect, selected }) => {
  return (
    <div className="filters-menu">
      <div className="filters-menu-selected">
        <span>{filterType === "sorting" ? `By ${selected.sorting}` : `${selected.format}`}</span>
        <ChevronDown size={16} />
      </div>
      <div className="filters-menu-options">
        {options.map((item, index) => (
          <div key={index} onClick={() => onSelect(item)}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

const Filters = ({ fetchData }) => {
  const initialFilters = {
    sorting: "relevance",
    format: "all",
    count: 0,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "UPDATE_SORT":
        return {
          ...state,
          sorting: action.payload,
        };

      case "UPDATE_FORMAT":
        return {
          ...state,
          format: action.payload,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialFilters);

  useEffect(() => {
    fetchData(state);
  }, [state]);

  return (
    <div className="filters">
      {console.log(state)}
      <FilterMenu
        filterType="sorting"
        options={sorting}
        selected={state}
        onSelect={item => dispatch({ type: "UPDATE_SORT", payload: item })}
      />
      <FilterMenu
        filterType="format"
        options={format}
        selected={state}
        onSelect={item => dispatch({ type: "UPDATE_FORMAT", payload: item })}
      />
    </div>
  );
};

export default Filters;

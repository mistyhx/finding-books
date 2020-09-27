import React, { useReducer } from "react";
import { ChevronDown } from "react-feather";
import "./index.scss";

const sorting = ["relevance", "newest"];
const format = ["all", "books", "magazines"];

const FilterMenu = ({ type, options, fetchData }) => {
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

      case "UPDATE_FORMAT":
        return {
          sorting: state.sorting,
          type: action.payload,
        };
    }
  };

  const [state, dispatch] = useReducer(reducer, initialFilters);

  const handleOnClick = item => {
    if (type === "sorting") {
      dispatch({ type: "UPDATE_SORT", payload: item });
      fetchData(state);
    }

    if (type === "format") {
      dispatch({ type: "UPDATE_FORMAT", payload: item });
      fetchData(state);
    }
  };

  return (
    <div className="filters-menu">
      <div className="filters-menu-selected">
        <span>{type === "sorting" ? `By ${state.sorting}` : `${state.type}`}</span>
        <ChevronDown size={16} />
      </div>
      <div className="filters-menu-options">
        {options.map((item, index) => (
          <div key={index} onClick={() => handleOnClick(item)}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

const Filters = ({ fetchData }) => {
  return (
    <div className="filters">
      <FilterMenu type="sorting" options={sorting} fetchData={state => fetchData(state)} />
      <FilterMenu type="format" options={format} fetchData={state => fetchData(state)} />
    </div>
  );
};

export default Filters;

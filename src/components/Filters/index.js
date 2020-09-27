import React, { useReducer, useEffect } from "react";
import { ChevronDown } from "react-feather";
import "./index.scss";

const sorting = ["relevance", "newest"];
const format = ["all", "books", "magazines"];

const FilterMenu = ({ format, options, fetchData }) => {
  const initialFilters = {
    sorting: "relevance",
    format: "all",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "UPDATE_SORT":
        console.log("update sort", state);
        return {
          ...state,
          sorting: action.payload.item,
        };

      case "UPDATE_FORMAT":
        console.log("update format", state);
        return {
          ...state,
          format: action.payload.item,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialFilters);

  useEffect(() => {
    console.log("fetch", state);
    fetchData(state);
  }, []);

  const handleOnClick = item => {
    console.log("before-branching", state);
    if (format === "sorting") {
      console.log("sorting-click", state);
      dispatch({ type: "UPDATE_SORT", payload: { item: item } });
    }

    if (format === "format") {
      console.log("format-onClick", state);
      dispatch({ type: "UPDATE_FORMAT", payload: { item: item } });
    }
  };

  return (
    <div className="filters-menu">
      <div className="filters-menu-selected">
        <span>{format === "sorting" ? `By ${state.sorting}` : `${state.format}`}</span>
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
      <FilterMenu format="sorting" options={sorting} fetchData={parameters => fetchData(parameters)} />
      <FilterMenu format="format" options={format} fetchData={parameters => fetchData(parameters)} />
    </div>
  );
};

export default Filters;

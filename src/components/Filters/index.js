import React, { useEffect, useContext } from "react";
import { ChevronDown } from "react-feather";
import "./index.scss";
import { SearchContext } from "../../context/SearchContext";

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
  const { parameters, updateSorting, updateFormat } = useContext(SearchContext);
  useEffect(() => {
    fetchData();
  }, [parameters]);

  return (
    <div className="filters">
      <FilterMenu filterType="sorting" options={sorting} selected={parameters} onSelect={item => updateSorting(item)} />
      <FilterMenu filterType="format" options={format} selected={parameters} onSelect={item => updateFormat(item)} />
    </div>
  );
};

export default Filters;

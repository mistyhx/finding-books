import React, { useContext } from "react";
import PropTypes from "prop-types";
import { ChevronDown } from "react-feather";
import { SearchContext } from "../../context/SearchContext";
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

FilterMenu.propTypes = {
  filterType: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.object.isRequired,
};

FilterMenu.defaultProps = {
  filterType: "",
  options: [],
  onSelect: () => {},
  selected: {},
};

const Filters = ({}) => {
  const { parameters, updateSorting, updateFormat } = useContext(SearchContext);

  return (
    <div className="filters">
      <FilterMenu filterType="sorting" options={sorting} selected={parameters} onSelect={item => updateSorting(item)} />
      <FilterMenu filterType="format" options={format} selected={parameters} onSelect={item => updateFormat(item)} />
    </div>
  );
};

export default Filters;

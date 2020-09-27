import React from "react";
import PropTypes from "prop-types";
import { ChevronsUp, ChevronsDown } from "react-feather";
import "./index.scss";

const Pagination = ({ pageSize, total, current, onChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(total / pageSize); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <div>
        <ChevronsUp onClick={() => onChange} />
      </div>
      {pageNumbers.map(number => (
        <div key={number} className={`${current === number && "active-page"}`} onClick={() => onChange(number)}>
          {number}
        </div>
      ))}
      <div>
        <ChevronsDown />
      </div>
    </div>
  );
};

Pagination.propTypes = {
  current: PropTypes.number,
  total: PropTypes.number,
  pageSize: PropTypes.number,
  onChange: PropTypes.func,
};

Pagination.defaultProps = {
  current: 1,
  total: 40,
  pageSize: 10,
  onChange: () => {},
};

export default Pagination;

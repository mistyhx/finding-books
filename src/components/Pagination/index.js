import React from "react";
import PropTypes from "prop-types";
import { ChevronsUp, ChevronsDown } from "react-feather";
import "./index.scss";

const Pagination = ({ pageSize, total, current }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(total / pageSize); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <div>
        <ChevronsUp />
      </div>
      {pageNumbers.map(number => (
        <div className={`${current === number && "active-page"}`}>{number}</div>
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
};

Pagination.defaultProps = {
  current: 1,
  total: 40,
  pageSize: 10,
};

export default Pagination;

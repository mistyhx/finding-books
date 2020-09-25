import React from "react";
import { ChevronsUp, ChevronsDown } from "react-feather";
import "./index.scss";

const Pagination = () => {
  return (
    <div className="pagination">
      <div>
        <ChevronsUp />
      </div>
      <div className="active-page">1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>
        <ChevronsDown />
      </div>
    </div>
  );
};

export default Pagination;

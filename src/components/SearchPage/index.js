import React, { useState } from "react";
import { navigate } from "@reach/router";
import backgroundImage from "../../bg.png";
import "./index.scss";
import ReadingBg from "../../assets/ReadingBg";

const SearchPage = () => {
  const [term, setTerm] = useState("");
  return (
    <div className="search">
      <div className="search-bg">
        <ReadingBg />
      </div>
      <div className="search-elements">
        <h1>
          What book would you like to <span className="highlight">find</span>?
        </h1>
        <form
          className="search-form"
          onSubmit={e => {
            e.preventDefault();
            if (term) {
              navigate("/results", { state: { searchTerm: term } });
            }
          }}
        >
          <input
            type="text"
            placeholder="Search by book title and author name"
            value={term}
            onChange={e => setTerm(e.target.value)}
          />
          <input type="submit" value="search" />
        </form>
      </div>
    </div>
  );
};

export default SearchPage;

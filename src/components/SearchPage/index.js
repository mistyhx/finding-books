import React, { useState } from "react";
import { navigate } from "@reach/router";
import "./index.css";

const SearchPage = () => {
  const [term, setTerm] = useState("");
  return (
    <div className="search-page">
      <div className="search-elements">
        <h1>
          What book would you like to <span className="highlight">find</span>?
        </h1>
        <form
          className="search-form"
          onSubmit={e => {
            e.preventDefault();
            navigate("/results", { state: { searchTerm: term } });
          }}
        >
          <input
            type="text"
            placeholder="Search by book title or author name"
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

import React, { useState } from "react";
import { navigate } from "@reach/router";

const SearchPage = () => {
  const [term, setTerm] = useState("");
  return (
    <div className="search-page">
      <h1>What book would you like to find? </h1>
      <form
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
        <input type="submit" />
      </form>
    </div>
  );
};

export default SearchPage;

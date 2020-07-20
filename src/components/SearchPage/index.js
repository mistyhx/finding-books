import React from "react";
import { navigate } from "@reach/router";

const SearchPage = () => {
  return (
    <div>
      <h1>What book would you like to find? </h1>
      <form
        onSubmit={e => {
          e.preventDefault();
          navigate("/results");
        }}
      >
        <input type="text" placeholder="Search by book title or author name" />
        <input type="submit" />
      </form>
    </div>
  );
};

export default SearchPage;

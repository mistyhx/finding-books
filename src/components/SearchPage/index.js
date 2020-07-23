import React, { useState } from "react";
import { navigate } from "@reach/router";
import backgroundImage from "../../bg.png";
import "./index.css";

const SearchPage = () => {
  const [term, setTerm] = useState("");
  return (
    <div
      className="search-page"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "left",
      }}
    >
      <div className="search-elements">
        <h1>
          What book would you like to <span className="highlight">find</span>?
        </h1>
        <form
          className="search-form"
          onSubmit={e => {
            e.preventDefault();
            navigate("/finding-books/results", { state: { searchTerm: term } });
          }}
        >
          <input
            type="text"
            placeholder="Search by book title or author name"
            value={term}
            onChange={e => setTerm(e.target.value)}
            required
          />
          <input type="submit" value="search" />
        </form>
      </div>
    </div>
  );
};

export default SearchPage;

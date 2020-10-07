import React, { useState } from "react";
import { navigate } from "@reach/router";
import backgroundImage from "../../bg.png";
import "./index.scss";

const SearchPage = () => {
  const [term, setTerm] = useState("");
  return (
    <div
      className="search"
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
            if (term) {
              navigate("/results", { state: { searchTerm: term } });
            }
          }}
        >
          <input type="text" placeholder="search" value={term} onChange={e => setTerm(e.target.value)} />
          <input type="submit" value="search" />
        </form>
      </div>
    </div>
  );
};

export default SearchPage;

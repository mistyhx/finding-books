import React, { useState, useEffect } from "react";
import axios from "axios";
import { Transition } from "react-spring/renderprops";

import Book from "../Book";
import Pagination from "../Pagination";
import Loader from "../Loader";
import "./index.css";
import Filters from "../Filters";

const ResultPage = ({ location }) => {
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState(location.state.searchTerm);
  const [searchTerm, setSearchTerm] = useState(location.state.searchTerm || "");
  const [results, setResults] = useState("");
  const API_URL = `https://www.googleapis.com/books/v1/volumes`;
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}?q=${searchTerm}`);
      setResults(response.data.items);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [searchTerm]);

  return (
    <div className="results-page">
      <Pagination />
      <div className="controls">
        <Filters />
        <form
          className="search-form"
          onSubmit={e => {
            e.preventDefault();
            setSearchTerm(input);
          }}
        >
          <input type="text" placeholder="search" value={input} onChange={e => setInput(e.target.value)} />
          <input type="submit" value="Search" />
        </form>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="results">
          {results && (
            <Transition
              items={results}
              keys={item => item.id}
              from={{ opacity: 0, transform: `translateX(80px)` }}
              enter={{ opacity: 1, transform: `translateX(0px)` }}
              leave={{ opacity: 0, transform: `translateX(-80px)` }}
              trail={200}
            >
              {item => props => (
                <div style={props}>
                  <Book data={item.volumeInfo} />
                </div>
              )}
            </Transition>
          )}
        </div>
      )}
    </div>
  );
};

export default ResultPage;

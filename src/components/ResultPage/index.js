import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import { Transition } from "react-spring/renderprops";

import Book from "../Book";
import Pagination from "../Pagination";
import Loader from "../Loader";
import "./index.css";
import Filters from "../Filters";

const ResultPage = ({ location }) => {
  const [input, setInput] = useState(location.state.searchTerm);
  const [searchTerm, setSearchTerm] = useState(location.state.searchTerm || "");

  const initialState = {
    loading: true,
    error: null,
    results: [],
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "FETCHING":
        return {
          loading: true,
          error: null,
          results: [],
        };
      case "COMPLETE":
        return { loading: false, error: null, results: action.payload };
      case "ERROR":
        return {
          loading: false,
          error: action.payload,
          results: [],
        };
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const API_URL = `https://www.googleapis.com/books/v1/volumes`;
  const fetchBooks = async () => {
    dispatch({ type: "FETCHING" });
    try {
      const response = await axios.get(`${API_URL}?q=${searchTerm}`);
      dispatch({ type: "COMPLETE", payload: response.data.items });
    } catch (e) {
      dispatch({ type: "ERROR", payload: e });
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
      {state.loading ? (
        <Loader />
      ) : (
        <div className="results">
          {state.results && (
            <Transition
              items={state.results}
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

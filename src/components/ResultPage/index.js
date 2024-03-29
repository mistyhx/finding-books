import React, { useState, useEffect, useReducer, useContext } from "react";
import axios from "axios";
import { Transition } from "react-spring/renderprops";
import { Folder } from "react-feather";
import Book from "../Book";
import Pagination from "../Pagination";
import Loader from "../Loader";
import Filters from "../Filters";
import "./index.scss";
import { SearchContext } from "../../context/SearchContext";
import Bookshelf from "../BookShelf";
import { BookshelfContext } from "../../context/BooksehlfContext";

const ResultPage = ({ location }) => {
  const [input, setInput] = useState(location.state ? location.state.searchTerm : "");
  const [current, setCurrent] = useState(1);
  const [open, setOpen] = useState(false);

  const { parameters } = useContext(SearchContext);
  const { savedBooks } = useContext(BookshelfContext);

  const initialState = {
    loading: true,
    error: null,
    results: [],
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const API_URL = `https://www.googleapis.com/books/v1/volumes`;
  const fetchBooks = async () => {
    dispatch({ type: "FETCHING" });
    try {
      const response = await axios.get(
        `${API_URL}?q=${input}&orderBy=${parameters.sorting}&printType=${parameters.format}&maxResults=40`
      );
      dispatch({ type: "COMPLETE", payload: response.data.items });
    } catch (e) {
      dispatch({ type: "ERROR", payload: e });
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [parameters]);

  const handleChangePage = number => {
    setCurrent(number);
    fetchBooks();
  };

  const lastBook = current * 10;
  const firstBook = lastBook - 10;

  return (
    <div>
      <div className="results-page">
        <div className="controls">
          <Filters fetchData={parameters => fetchBooks(parameters)} />
          <div className="controls-right">
            <form
              className="search-form"
              onSubmit={e => {
                e.preventDefault();
                if (input) {
                  setCurrent(1);
                  fetchBooks();
                }
              }}
            >
              <input type="text" placeholder="search" value={input} onChange={e => setInput(e.target.value)} />
              <input type="submit" value="Search" />
            </form>
            <div className="icon-bookshelf">
              {savedBooks.books.length ? <div className="icon-bookshelf-badge">{savedBooks.books.length}</div> : null}
              <Folder className="icon-button" size={24} fill={open ? "black" : "none"} onClick={() => setOpen(!open)} />
            </div>
          </div>
        </div>
        {state.loading ? (
          <Loader />
        ) : (
          <div className="results">
            {state.results ? (
              <div>
                <Transition
                  items={state.results.slice(firstBook, lastBook)}
                  keys={item => item.id}
                  from={{ opacity: 0, transform: `translateX(80px)` }}
                  enter={{ opacity: 1, transform: `translateX(0px)` }}
                  leave={{ opacity: 0, transform: `translateX(-80px)` }}
                  trail={200}
                >
                  {item => props => (
                    <div style={props}>
                      <Book data={item} />
                    </div>
                  )}
                </Transition>
                <Pagination
                  current={current}
                  pageSize={10}
                  total={state.results.length}
                  onChange={number => handleChangePage(number)}
                />
              </div>
            ) : (
              "No Result Found"
            )}
          </div>
        )}
      </div>
      <Bookshelf open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default ResultPage;

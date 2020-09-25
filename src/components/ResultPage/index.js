import React, { useState, useEffect } from "react";
import axios from "axios";
import { Transition, animated } from "react-spring/renderprops";
import { ChevronDown, ChevronsUp, ChevronsDown } from "react-feather";
import Book from "../../components/Book";
import Loader from "../Loader";
import "./index.css";

const ResultPage = ({ location }) => {
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState(location.state.searchTerm);
  const [searchTerm, setSearchTerm] = useState(location.state.searchTerm || "");
  const [results, setResults] = useState("");
  const API_URL = `https://www.googleapis.com/books/v1/volumes`;
  const fetchBooks = async () => {
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
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="results-page">
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
          <div className="controls">
            <div className="filters">
              <div>
                <span>Sort by relevance</span>
                <ChevronDown size={16} />
              </div>
              <div>
                <span>Publish date </span>
                <ChevronDown size={16} />
              </div>
              <div>
                <span> Categories </span>
                <ChevronDown size={16} />
              </div>
            </div>
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
          <div className="results">
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
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultPage;

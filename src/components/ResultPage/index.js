import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { ChevronDown, ChevronsUp, ChevronsDown } from "react-feather";
import "./index.css";

const Book = ({ data }) => {
  return (
    <div className="book">
      <div className="book-cover">
        <a href={data.previewLink} target="_blank" rel="external">
          <img
            src={
              data.imageLinks.smallThumbnail
                ? data.imageLinks.smallThumbnail
                : "https://i.dlpng.com/static/png/6565478_preview.png"
            }
            alt={data.title}
          />
        </a>
      </div>
      <div className="book-info">
        <span className="title">{data.title}</span>
        <div>
          <p className="description">{data.description}</p>
          <div className="meta">
            <span>
              {data.authors && data.authors[0]}-{data.publishedDate}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

Book.propTypes = {
  data: PropTypes.object.isRequired,
};

Book.defaultProps = {
  data: {},
};

const ResultPage = ({ location }) => {
  const [input, setInput] = useState(location.state.searchTerm);
  const [results, setResults] = useState("");
  const API_URL = `https://www.googleapis.com/books/v1/volumes`;
  const fetchBooks = async searchTerm => {
    const response = await axios.get(`${API_URL}?q=${searchTerm}`);
    setResults(response.data.items);
  };

  useEffect(() => {
    fetchBooks(location.state.searchTerm);
  }, []);

  return (
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
            fetchBooks(input);
          }}
        >
          <input type="text" placeholder="search" value={input} onChange={e => setInput(e.target.value)} />
          <input type="submit" value="Search" />
        </form>
      </div>
      <div className="results">
        {results && results.map(result => <Book key={result.id} data={result.volumeInfo} />)}
      </div>
    </div>
  );
};

export default ResultPage;

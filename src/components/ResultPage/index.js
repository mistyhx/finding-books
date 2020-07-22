import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search, ChevronDown } from "react-feather";
import "./index.css";

const Book = ({ data }) => {
  return (
    <div className="book">
      <div className="book-cover">
        <a href={data.previewLink} target="_blank">
          <img src={data.imageLinks.smallThumbnail} />
        </a>
      </div>
      <div className="book-info">
        <span className="title">{data.title}</span>
        <div>
          <p className="description">{data.description}</p>
          <div className="meta">
            <span> - {data.publishedDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
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
      <div className="controls">
        <div className="filters">
          <div>
            Sort by date
            <ChevronDown size={16} />
          </div>
          <div>
            Publish date <ChevronDown size={16} />
          </div>
          <div>
            Categories <ChevronDown size={16} />
          </div>
        </div>
        <form
          className="search-form"
          onSubmit={e => {
            e.preventDefault();
            fetchBooks(input);
          }}
        >
          {/*<Search className="search-icon" size={24} />*/}
          <input type="text" placeholder="search" value={input} onChange={e => setInput(e.target.value)} />
          <input type="submit" value="Search" />
        </form>
      </div>
      <div className="results">
        {results && results.map(result => <Book key={result.id} data={result.volumeInfo} />)}
        {console.log(results)}
      </div>
    </div>
  );
};

export default ResultPage;

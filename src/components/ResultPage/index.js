import React, { useState, useEffect } from "react";
import axios from "axios";

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
    <div>
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            fetchBooks(input);
          }}
        >
          <input type="text" placeholder="search" value={input} onChange={e => setInput(e.target.value)} />
          <input type="submit" />
        </form>
      </div>
      <div>{results && results.map(result => <li key={result.id}>{result.volumeInfo.title}</li>)}</div>;
    </div>
  );
};

export default ResultPage;

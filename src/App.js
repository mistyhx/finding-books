import React from "react";
import "./App.css";
import { Book } from "react-feather";
import SearchPage from "./components/SearchPage";
import { Router, Link } from "@reach/router";
import ResultPage from "./components/ResultPage";

function App() {
  return (
    <div className="App">
      <div className="logo">
        <Link to="/finding-books">
          <Book size={18} />
          <span>EleBooks</span>
        </Link>
      </div>
      <Router className="main">
        <SearchPage path="/finding-books" />
        <ResultPage path="/finding-books/results" />
      </Router>
    </div>
  );
}

export default App;

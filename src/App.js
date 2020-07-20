import React from "react";
import "./App.css";
import SearchPage from "./components/SearchPage";
import { Router, Link } from "@reach/router";
import ResultPage from "./components/ResultPage";

function App() {
  return (
    <div className="App">
      <Link to="/">
        <div className="logo">Bookstore</div>
      </Link>
      <Router>
        <SearchPage path="/" />
        <ResultPage path="/results" />
      </Router>
    </div>
  );
}

export default App;

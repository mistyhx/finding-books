import React from "react";
import { Book } from "react-feather";
import SearchPage from "./components/SearchPage";
import { Router, Link } from "@reach/router";
import ResultPage from "./components/ResultPage";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <div className="logo">
        <Link to="/">
          <Book size={18} />
          <span>EleBooks</span>
        </Link>
      </div>
      <Router className="main">
        <SearchPage path="/" />
        <ResultPage path="/results" />
      </Router>
    </div>
  );
}

export default App;

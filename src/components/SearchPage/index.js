import React, { useState } from "react";
import { navigate } from "@reach/router";
import { animated } from "react-spring";
import { Transition } from "react-spring/renderprops";
import "./index.scss";
import ReadingBg from "../../assets/ReadingBg";

const SearchForm = () => {
  const [term, setTerm] = useState("");
  return (
    <form
      className="search-form"
      onSubmit={e => {
        e.preventDefault();
        if (term) {
          navigate("/results", { state: { searchTerm: term } });
        }
      }}
    >
      <input
        type="text"
        placeholder="Search by book title and author name"
        value={term}
        onChange={e => setTerm(e.target.value)}
      />
      <input type="submit" value="search" />
    </form>
  );
};

const Title = () => {
  return (
    <h1>
      What book would you like to <span className="highlight">find</span>?
    </h1>
  );
};

const Elements = [
  props => (
    <animated.div style={props}>
      <Title />
    </animated.div>
  ),
  props => (
    <animated.div style={props}>
      <SearchForm />
    </animated.div>
  ),
];

const SearchPage = () => {
  return (
    <div className="search">
      <div className="search-bg">
        <ReadingBg />
      </div>
      <div className="search-elements">
        <Transition
          items={[0, 1]}
          keys={(item, index) => index}
          from={{ opacity: 0, transform: `translateY(40px)` }}
          enter={{ opacity: 1, transform: `translateY(0px)` }}
          leave={{ opacity: 0, transform: `translateY(-40px)` }}
          trail={300}
        >
          {item => Elements[item]}
        </Transition>
      </div>
    </div>
  );
};

export default SearchPage;

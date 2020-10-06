import React, { useContext, useRef } from "react";
import { useSpring, useTransition, animated } from "react-spring";
import "./index.scss";
import { BookshelfContext } from "../../context/BooksehlfContext";

const Bookshelf = ({ open }) => {
  const { savedBooks } = useContext(BookshelfContext);

  const props = useSpring({
    opacity: open ? 1 : 0,
    height: open ? "12rem" : "0rem",
  });

  return (
    <animated.div className="bookshelf" style={props}>
      <h3>Favorites</h3>
      <div className="favorite-books-list">
        {savedBooks.books &&
          savedBooks.books.reverse().map(book => (
            <div key={book.id} className="favorite-book">
              <img src={book.cover} alt={book.title} width="60px" />
            </div>
          ))}
      </div>
    </animated.div>
  );
};

export default Bookshelf;

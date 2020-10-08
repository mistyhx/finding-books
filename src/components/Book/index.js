import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Heart } from "react-feather";
import { BookshelfContext } from "../../context/BooksehlfContext";
import "./index.scss";

const Book = ({ data }) => {
  const { savedBooks, addBook, removeBook } = useContext(BookshelfContext);

  const { previewLink, imageLinks, title, description, authors, publishedDate } = data.volumeInfo;
  const { id } = data;

  const handleFavorite = () => {
    if (savedBooks.books.some(item => item.id === id)) {
      removeBook(id);
    } else {
      addBook(data);
    }
  };

  return (
    <div className="book">
      <div className="book-cover">
        <a href={previewLink && previewLink} target="_blank" rel="noopener noreferrer">
          {imageLinks ? (
            <img
              src={
                imageLinks.smallThumbnail
                  ? imageLinks.smallThumbnail
                  : "https://i.dlpng.com/static/png/6565478_preview.png"
              }
              alt={title && title}
            />
          ) : (
            <img src="https://i.dlpng.com/static/png/6565478_preview.png" alt="no-cover" />
          )}
        </a>
      </div>
      <div className="book-info">
        <div className="title">
          <div className="title-text">{title && title}</div>
          <div>
            <Heart
              className="icon-button"
              size={24}
              onClick={() => handleFavorite()}
              fill={savedBooks.books.some(item => item.id === id) ? "black" : "none"}
            />
          </div>
        </div>

        <div>
          <p className="description">{description && description}</p>
          <div className="meta">
            <span>
              {authors
                ? authors.map((author, index) => (
                    <span key={index} className="author-name">
                      {author}
                    </span>
                  ))
                : "Unknown Author"}
              - <span className="publish-date">{publishedDate && publishedDate}</span>
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

export default Book;

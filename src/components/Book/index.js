import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Heart } from "react-feather";
import { BookshelfContext } from "../../context/BooksehlfContext";
import "./index.scss";

const Book = ({ data }) => {
  const [favorite, setFavorite] = useState(false);
  const { addBook, removeBook } = useContext(BookshelfContext);

  const { previewLink, imageLinks, title, description, authors, publishedDate } = data.volumeInfo;

  const handleFavorite = () => {
    setFavorite(!favorite);
    if (favorite) {
      removeBook(data.id);
    } else {
      addBook(data);
    }
  };

  return (
    <div className="book">
      <div className="book-cover">
        <a href={previewLink && previewLink} target="_blank" rel="noopener noreferrer">
          {imageLinks ? (
            <img src={imageLinks.smallThumbnail} alt={title && title} />
          ) : (
            <img src="https://i.dlpng.com/static/png/6565478_preview.png" alt="no-cover" />
          )}
        </a>
      </div>
      <div className="book-info">
        <div className="title">
          {title && title}
          <Heart
            className="icon-button"
            size={24}
            onClick={() => handleFavorite()}
            fill={favorite ? "black" : "none"}
          />
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

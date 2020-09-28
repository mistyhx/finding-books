import React from "react";
import PropTypes from "prop-types";
import "./index.css";

const Book = ({ data }) => {
  return (
    <div className="book">
      <div className="book-cover">
        <a href={data.previewLink && data.previewLink} target="_blank" rel="noopener noreferrer">
          {data.imageLinks ? (
            <img src={data.imageLinks.smallThumbnail} alt={data.title && data.title} />
          ) : (
            <img src="https://i.dlpng.com/static/png/6565478_preview.png" alt="no-cover" />
          )}
        </a>
      </div>
      <div className="book-info">
        <span className="title">{data.title && data.title}</span>
        <div>
          <p className="description">{data.description && data.description}</p>
          <div className="meta">
            <span>
              {data.authors
                ? data.authors.map((author, index) => (
                    <span key={index} className="author-name">
                      {author}
                    </span>
                  ))
                : "Unknown Author"}
              - <span className="publish-date">{data.publishedDate && data.publishedDate}</span>
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

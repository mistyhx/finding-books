import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { useSpring, useTransition, animated } from "react-spring";
import { X } from "react-feather";
import { BookshelfContext } from "../../context/BooksehlfContext";
import useMousePosition from "../../hooks/useMousePosition";
import "./index.scss";

const Bookshelf = ({ open, onClose }) => {
  const { savedBooks, removeBook } = useContext(BookshelfContext);
  const [dragging, setDragging] = useState("");

  const { y } = useMousePosition();

  const props = useSpring({
    opacity: open ? 1 : 0,
    height: open ? "14rem" : "0rem",
  });

  const transitions = useTransition(savedBooks.books, item => item.id, {
    from: { opacity: 0, transform: `translateY(20px)` },
    enter: { opacity: 1, transform: `translateY(0px)` },
    leave: { opacity: 0, transform: `translateY(20px)` },
  });

  const handleDragging = id => {
    setDragging(id);
  };

  const handleDragEnd = id => {
    setDragging("");
    if (window.innerHeight - y > 224) {
      removeBook(id);
    }
  };

  return (
    <animated.div className="bookshelf" style={props}>
      <div className="bookshelf-title">
        <h3>Favorites</h3>
        <X className="icon-button" size={18} onClick={() => onClose()} />
      </div>
      <div className="favorite-books-list">
        {transitions.map(
          ({ item, key, props }) =>
            item && (
              <animated.div
                key={key}
                style={props}
                className={`favorite-book ${dragging === item.id && "favorite-book-dragging"}`}
                draggable="true"
                onDragOver={() => handleDragging(item.id)}
                onDragEnd={() => handleDragEnd(item.id)}
              >
                <a href={item.url && item.url} target="_blank" rel="noopener noreferrer" draggable="false">
                  <img
                    src={item.cover ? item.cover : "https://i.dlpng.com/static/png/6565478_preview.png"}
                    alt={item.title}
                    width="60px"
                    draggable="false"
                  />
                </a>
              </animated.div>
            )
        )}
      </div>
    </animated.div>
  );
};

Bookshelf.propTypes = {
  open: PropTypes.bool.isRequired,
};

Bookshelf.defaultProps = {
  open: false,
};

export default Bookshelf;

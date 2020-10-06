import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useSpring, useTransition, animated } from "react-spring";
import { BookshelfContext } from "../../context/BooksehlfContext";
import "./index.scss";

const Bookshelf = ({ open }) => {
  const { savedBooks } = useContext(BookshelfContext);

  const props = useSpring({
    opacity: open ? 1 : 0,
    height: open ? "14rem" : "0rem",
  });

  const transitions = useTransition(savedBooks.books, item => item.id, {
    from: { opacity: 0, transform: `translateY(20px)` },
    enter: { opacity: 1, transform: `translateY(0px)` },
    leave: { opacity: 0, transform: `translateY(20px)` },
  });

  return (
    <animated.div className="bookshelf" style={props}>
      <h3>Favorites</h3>
      <div className="favorite-books-list">
        {transitions.map(
          ({ item, key, props }) =>
            item && (
              <animated.div key={key} style={props} className="favorite-book">
                <img
                  src={item.cover ? item.cover : "https://i.dlpng.com/static/png/6565478_preview.png"}
                  alt={item.title}
                  width="60px"
                />
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

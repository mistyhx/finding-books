import React, { useContext } from "react";
import "./index.scss";
import { BookshelfContext } from "../../context/BooksehlfContext";

const Bookshelf = () => {
  const { savedBooks } = useContext(BookshelfContext);
  console.log(savedBooks.books);

  return (
    <div className="bookshelf">
      <h3>Favorites</h3>
      <div className="favorite-books-list">
        {savedBooks.books &&
          savedBooks.books.map(book => (
            <div key={book.id} className="favorite-book">
              {book.title}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Bookshelf;

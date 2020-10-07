import React, { useReducer, createContext } from "react";

export const BookshelfContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_BOOK":
      return {
        ...state,
        books: [
          ...state.books,
          {
            id: action.payload.id,
            title: action.payload.volumeInfo.title,
            cover: action.payload.volumeInfo.imageLinks && action.payload.volumeInfo.imageLinks.smallThumbnail,
            url: action.payload.volumeInfo.previewLink && action.payload.volumeInfo.previewLink,
          },
        ],
      };

    case "REMOVE_BOOK":
      return {
        ...state,
        books: state.books.filter(item => action.payload !== item.id),
      };

    default:
      return state;
  }
};

export const BookShelfProvider = ({ children }) => {
  const initialState = {
    books: [],
  };

  const addBook = item => {
    dispatch({ type: "ADD_BOOK", payload: item });
  };

  const removeBook = id => {
    dispatch({ type: "REMOVE_BOOK", payload: id });
  };

  const [savedBooks, dispatch] = useReducer(reducer, initialState);
  const value = { savedBooks, addBook, removeBook };
  return <BookshelfContext.Provider value={value}>{children}</BookshelfContext.Provider>;
};

import React, { useReducer, createContext } from "react";

export const BookshelfContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_BOOK":
      return {
        ...state,
        books: [...state.books, action.payload],
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

  const removeBook = item => {
    dispatch({ type: "REMOVE_BOOK", payload: item });
  };

  const [savedBooks, dispatch] = useReducer(reducer, initialState);
  const value = { savedBooks, addBook, removeBook };
  return <BookshelfContext.Provider value={value}>{children}</BookshelfContext.Provider>;
};

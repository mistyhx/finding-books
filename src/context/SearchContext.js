import React, { useReducer, createContext } from "react";

export const SearchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_SORT":
      return {
        ...state,
        sorting: action.payload,
      };

    case "UPDATE_FORMAT":
      return {
        ...state,
        format: action.payload,
      };

    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {
  const initialState = {
    sorting: "relevance",
    format: "all",
  };

  const updateSorting = item => {
    dispatch({ type: "UPDATE_SORT", payload: item });
  };

  const updateFormat = item => {
    dispatch({ type: "UPDATE_FORMAT", payload: item });
  };

  const [parameters, dispatch] = useReducer(reducer, initialState);
  const value = { parameters, updateFormat, updateSorting };
  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
};

import React, { useState, useEffect } from "react";
import axios from "axios";

export const useFetch = (url, keyword) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}?q=${keyword}`);
      setLoading(false);
      setResponse(response.data.items);
    } catch (e) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [keyword]);
  return [response, error, loading];
};

import { useReducer, useEffect, useCallback } from "react";
import axios from "axios";
import { useCookie } from "react-use";

const reducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        loading: true,
        data: null,
        error: null,
      };
    case "SUCCESS":
      return {
        loading: false,
        data: action.data,
        error: null,
      };
    case "ERROR":
      return {
        loading: false,
        data: action.data,
        error: action.error,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

// const useAsync = (callback, deps = []) => {
const useAsync = (method, url, data, deps = []) => {
  const [value, updateCookie, deleteCookie] = useCookie("user");
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: null,
  });

  const fetchData = useCallback(async () => {
    dispatch({ type: "LOADING" });
    let reponsive = {};
    try {
      if (method === "get") {
        reponsive = await axios.get(url, {
          headers: {
            user: value,
          },
        });
      } else {
        reponsive = await axios.post(url, data, {
          headers: {
            user: value,
          },
        });
      }
      console.log(reponsive);
      dispatch({ type: "SUCCESS", data: reponsive.data });
    } catch (e) {
      dispatch({ type: "ERROR", error: e });
      console.log(e);
    }
  }, [data, method, url, value]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return [state, fetchData];
};

export default useAsync;

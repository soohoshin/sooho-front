import { useReducer, useEffect, useCallback, useState } from "react";
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
const useAsync = (method, url, skip = false, data = {}, deps = []) => {
  const [value, updateCookie, deleteCookie] = useCookie("user");
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: null,
  });
  const env = process.env.REACT_APP_ENV || "DEV";
  console.log("쫌!!", process.env.REACT_APP_ENV);
  let defalutUrl = "";
  if (env === "PROD") {
    defalutUrl =
      "http://ec2-3-133-112-140.us-east-2.compute.amazonaws.com:9981";
  } else {
    defalutUrl = "http://localhost:9981";
  }

  // const [defalutUrl, setDefalutUrl] = useState("http://localhost:9981");
  // useEffect(() => {
  //   console.log("env!!!!!!", env);
  //   if (env === "PROD") {
  //     setDefalutUrl(
  //       "http://ec2-3-133-112-140.us-east-2.compute.amazonaws.com:9981"
  //     );
  //   } else {
  //     setDefalutUrl("http://localhost:9981");
  //   }
  //   console.log(defalutUrl);
  // }, [env]);

  useEffect(() => {
    console.log(defalutUrl);
  }, [defalutUrl]);

  const fetchData = useCallback(
    async (getData = data) => {
      dispatch({ type: "LOADING" });
      let reponsive = {};
      try {
        if (method === "get") {
          reponsive = await axios.get(defalutUrl + url, {
            headers: {
              user: value,
            },
          });
        } else {
          if (!data) {
            return (reponsive.data = null);
          } else {
            reponsive = await axios.post(defalutUrl + url, getData, {
              headers: {
                user: value,
              },
            });
          }
        }
        console.log(reponsive);
        dispatch({ type: "SUCCESS", data: reponsive.data });
      } catch (e) {
        dispatch({ type: "ERROR", error: e });
        console.log(e);
      }
    },
    [data, method, url, value, defalutUrl]
  );

  useEffect(() => {
    if (skip) {
      return;
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return [state, fetchData];
};

export default useAsync;

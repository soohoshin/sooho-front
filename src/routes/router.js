import React, { useEffect } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Main from "./main";
import Product from "./product";
import Join from "./join";
import Login from "./login";
import useAsync from "../api/api";
import { useCookie, useAudio } from "react-use";
import { useLogin } from "../util";
import Detail from "./detail";
import MusicPlayer from "../components/musicplayer/musicplayer";

const Routes = () => {
  const setLogin = useLogin();
  const [value, updateCookie, deleteCookie] = useCookie("user");
  const [state, refetch] = useAsync("get", "/api/userdata");
  const { loading, data: user, error } = state;

  useEffect(() => {
    if (user) {
      console.log(user);
      setLogin({
        isOurLogin: true,
        userId: user.userId,
        userName: user.userName,
      });
    } else {
      setLogin({
        isOurLogin: false,
        userId: null,
        userName: null,
      });
    }
  }, [setLogin, user, value]);
  return (
    <>
      <Route path="/" exact component={Main} />
      <Route path="/product" component={Product} />
      <Route path="/detail/:productId" component={Detail} />
      <Route path="/join" component={Join} />
      <Route path="/login" component={Login} />
      <MusicPlayer />
    </>
  );
};

export default Routes;

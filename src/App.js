import React from "react";
import LayoutComponent from "./components/layout/layout";
import Routes from "./routes/router";
import GlobalStyles from "./styled/global-styles";
import { HashRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <>
      <GlobalStyles />
      <LayoutComponent>
        <Routes />
      </LayoutComponent>
    </>
  );
}

export default App;

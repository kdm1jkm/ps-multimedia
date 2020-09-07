import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "Routes/Home";

export default () => (
  <HashRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Redirect from="*" to="/" />
    </Switch>
  </HashRouter>
);

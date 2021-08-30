import React, { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Home from "./home/page/Home";
import Courses from "./courses/pages/Courses";
import Auth from "./authentication/pages/Auth";
import Problem from "./problem/pages/Problem";
import { AuthContext } from "./shared/context/auth-context";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/courses">
          <Courses />
        </Route>
        <Route path="/courses/course">Your course</Route>
        <Route path="/user">Your users page</Route>
        <Route path="/about">about</Route>
        <Route path="/intro">intro</Route>
        <Route path="/problem">
          <Problem />
        </Route>
        <Redirect to="/courses" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/about">about</Route>
        <Route path="/intro">intro</Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="/problem">
          <Problem />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;

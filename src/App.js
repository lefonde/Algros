import React, { useState, useCallback, useEffect } from "react";
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
  const [userId, setUserId] = useState(-1);

  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
    localStorage.setItem("userData", JSON.stringify({ userId: uid }));
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if(storedData) {
      login(storedData.userId);
    }

  }, [login]);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/courses" exact>
          <Courses />
        </Route>
        <Route path="/courses/:courseId/course">
          <Problem />
        </Route>
        <Route path="/user">Your users page</Route>
        <Route path="/about">about</Route>
        <Route path="/intro">intro</Route>
        {/* <Route path="/problem">
          <Problem />
        </Route> */}
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
        <Route path="/courses/:courseId/course">
          <Problem />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        {/* <Route path="/problem">
          <Problem />
        </Route> */}
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;

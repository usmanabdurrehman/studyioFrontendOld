import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Signin, Signup, Timeline, Profile, Post } from "Pages";

import { AlertProvider, ModalProvider } from "Providers";
import { ToastProvider } from "react-toast-notifications";

import { PublicRoute, PrivateRoute } from "Routes";

import { useSelector } from "react-redux";

const App = () => {
  const isAuth = useSelector((state) => state.user) ? true : false;

  return (
    <div id="App">
      <ToastProvider>
        <AlertProvider>
          <ModalProvider>
            <Router>
              <PublicRoute exact path="/" component={Signin} isAuth={isAuth} />
              <PublicRoute path="/signup" component={Signup} isAuth={isAuth} />
              <PrivateRoute
                path="/timeline"
                component={Timeline}
                isAuth={isAuth}
              />
              <PrivateRoute
                path="/profile/:id"
                component={Profile}
                isAuth={isAuth}
              />
              <PrivateRoute path="/post/:id" component={Post} isAuth={isAuth} />
            </Router>
          </ModalProvider>
        </AlertProvider>
      </ToastProvider>
    </div>
  );
};

export default App;

import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import { Signin, Signup, Timeline, Profile, Post } from "Pages";

import store from "./store";
import { Provider } from "react-redux";

import { AlertProvider } from "Providers";
import { ToastProvider } from "react-toast-notifications";

const App = () => {
  return (
    <div id="App">
      <Provider store={store}>
        <ToastProvider>
          <AlertProvider>
            <Router>
              <Route exact path="/" component={Signin} />
              <Route path="/signup" component={Signup} />
              <PrivateRoute path="/timeline" component={Timeline} />
              <PrivateRoute path="/profile/:id" component={Profile} />
              <PrivateRoute path="/post/:id" component={Post} />
            </Router>
          </AlertProvider>
        </ToastProvider>
      </Provider>
    </div>
  );
};

export default App;

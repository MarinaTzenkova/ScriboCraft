import React from "react";

import { withAuthtentication } from "./session";

import { BrowserRouter as Router, Route } from "react-router-dom";
import * as ROUTES from "./constants/routes";

import SignUpPage from "./signup";
import SignInPage from "./signin";
import Stories from "./stories";
import WriteStory from "./write-story";

import Navigation from "./navigation";
const App = () => (
  <Router>
    <Navigation />
    <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
    <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
    <Route exact path={ROUTES.WRITE_STORY} component={WriteStory} />
    <Route exact path={ROUTES.STORIES} component={Stories} />
  </Router>
);

export default withAuthtentication(App);

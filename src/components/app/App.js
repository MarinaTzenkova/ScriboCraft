import React from "react";

import { withAuthtentication } from "src/shared/session";

import { BrowserRouter as Router, Route } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

import SignUpPage from "../signup";
import SignInPage from "../signin";
import Stories from "../stories";
import Chapters from "../chapters";
import WriteStory from "../write-story";

import Navigation from "src/shared/navigation";
const App = () => (
  <Router>
    <Navigation />
    <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
    <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
    <Route exact path={ROUTES.WRITE_STORY} component={WriteStory} />
    <Route exact path={ROUTES.STORIES} component={Stories} />
    <Route exact path={ROUTES.CHAPTERS} component={Chapters} />
  </Router>
);

export default withAuthtentication(App);

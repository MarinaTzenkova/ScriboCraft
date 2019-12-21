import React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";
import * as ROUTES from "./constants/routes";

import SignUpPage from "./account";
import Navigation from "./navigation";
import WriteStory from "./write-story";
import Stories from "./stories";
import SectionAdd from "./add-section";

var loggedIn = false;

function App() {
  return (
    <div>
      {loggedIn ? (
        <Router>
          <Navigation />

          <Route exact path={ROUTES.WRITE_STORY} component={WriteStory} />
          <Route path={ROUTES.STORIES} component={Stories} />
          <Route path={ROUTES.ADD_SECTION} component={SectionAdd} />
        </Router>
      ) : (
        <div></div>
      )}
      <SignUpPage />
    </div>
  );
}

export default App;

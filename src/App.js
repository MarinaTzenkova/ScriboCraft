import React, { useState } from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";
import * as ROUTES from "./constants/routes";

import SignUpPage from "./signup";
import SignInPage from "./signin";
import Navigation from "./navigation";

function App() {
  const isLoggedIn = true;
  return (
    <div>
      <Router>
        {isLoggedIn ? <Navigation /> : <div></div>}
        <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
      </Router>
    </div>
  );
}

export default App;

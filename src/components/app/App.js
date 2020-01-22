import React, { Component } from "react";

import { withAuthtentication } from "src/shared/utils/session";

import { BrowserRouter as Router, Route } from "react-router-dom";
import * as ROUTES from "src/constants/routes";

import SignUpPage from "../authentication/signup";
import SignInPage from "../authentication/signin";
import Stories from "../writing/stories";
import Chapters from "../writing/chapters";
import WriteStory from "../writing/write-story";
import AddSection from "../configuration/add-section";
import Home from "../home";

import Navigation from "src/shared/components/navigation";
import Header from "src/shared/components/header";
import Characters from "../writing/characters";
import Account from "../authentication/account"


const INITIAL_STATE = {
  navigationItems: [
    {
      type: "write",
      path: "/story",
      description: "Write story."
    },
    {
      type: "stories",
      path: "/stories",
      description: "Access all your stories."
    }
  ]
};

const addSection = {
  type: "add",
  path: "/add-section",
  description: "Add new custom page to your menu."
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    this.props.firebase
      .sections()
      .once("value")
      .then(snapshot => {
        if (snapshot.val()) {
          const navItems =
            this.props.firebase.auth.getUid() in snapshot.val()
              ? snapshot.val()[this.props.firebase.auth.getUid()]
              : null;

          this.setState(prevState => ({
            navigationItems: [...prevState.navigationItems, navItems]
          }));
        }
      })
      .finally(() => {
        this.setState(prevState => ({
          navigationItems: [...prevState.navigationItems, addSection]
        }));
      });
  }

  render() {
    return (
      <Router>
        <Navigation navigationItems={this.state.navigationItems}>
          <Header>
            <Route exact path={ROUTES.HOME} component={Home} />
            <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route exact path={ROUTES.WRITE_STORY} component={WriteStory} />
            <Route exact path={ROUTES.STORIES} component={Stories} />
            <Route exact path={ROUTES.CHAPTERS} component={Chapters} />
            <Route exact path={ROUTES.CHARACTERS} component={Characters} />
            <Route exact path={ROUTES.ADD_SECTION} component={AddSection} />
            <Route exact path={ROUTES.ACCOUNT} component={Account} />
          </Header>
        </Navigation>
      </Router>
    );
  }
}

export default withAuthtentication(App);

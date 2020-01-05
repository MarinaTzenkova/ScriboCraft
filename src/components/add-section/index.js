import React, { Component } from "react";
import { AuthUserContext, withAuthorization } from "src/shared/session";

class AddSection extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AuthUserContext.Consumer>
        <div></div>
      </AuthUserContext.Consumer>
    );
  }
}


const condition = authUser => !!authUser;

export default withAuthorization(condition)(AddSection);
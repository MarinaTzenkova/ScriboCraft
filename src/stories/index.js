import React from "react";
import { AuthUserContext, withAuthorization } from "../session";

const Stories = () => (
  <AuthUserContext.Consumer>
    {authUser => <div></div>}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Stories);

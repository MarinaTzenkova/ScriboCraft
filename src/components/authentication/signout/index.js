import React from "react";
import { withFirebase } from "../../../shared/utils/firebase";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const SignOutButton = ({ firebase }) => (
  <button onClick={firebase.doSignOut}>
    <ExitToAppIcon style={{ fontSize: "2rem" }} className="text-red-800" />
  </button>
);

export default withFirebase(SignOutButton);

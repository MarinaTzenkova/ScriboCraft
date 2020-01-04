import React from "react";
import { withFirebase } from "src/shared/firebase";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const SignOutButton = ({ firebase }) => (
  <button className="absolute bottom-0 ml-8 mb-12" onClick={firebase.doSignOut}>
    <ExitToAppIcon style={{fontSize: "2rem"}} className="text-red-800"/>
  </button>
);

export default withFirebase(SignOutButton);
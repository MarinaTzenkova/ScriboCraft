import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/App";
import * as serviceWorker from "./serviceWorker";
import "./styles/tailwind.css";
import Firebase, { FirebaseContext } from './shared/utils/firebase';

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

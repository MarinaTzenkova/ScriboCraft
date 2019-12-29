import app from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

var config = {
  apiKey: "AIzaSyAOpkQWeZiYh9gJFrc1FnlR4ZL2aWDCyxo",
  authDomain: "scribocraft.firebaseapp.com",
  databaseURL: "https://scribocraft.firebaseio.com",
  projectId: "scribocraft",
  storageBucket: "scribocraft.appspot.com",
  messagingSenderId: "676847723366",
  appId: "1:676847723366:web:75cac40916b9e1d7201ea7",
  measurementId: "G-FBH2X1TBKL"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
    this.storage = app.storage();
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  user = uid => this.db.ref(`users/${uid}`);
  users = () => this.db.ref("users");

  sections = () => this.db.ref("sections");

  stories = uid => this.storage.ref(`stories/${uid}/`);
}

export default Firebase;

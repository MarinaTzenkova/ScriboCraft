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

  story = title => this.db.ref(`stories/${title}`);
  allStories = () => this.db.ref("stories");

  userStory = (uid, title) => this.db.ref(`users/${uid}/stories/${title}`);
  chapters = (uid, story) => this.db.ref(`users/${uid}/stories/${story}/`);
  chapter = (uid, story, title) =>
    this.db.ref(`users/${uid}/stories/${story}/${title}`);

  section = uid => this.db.ref(`sections/${uid}`);
  sections = () => this.db.ref("sections");

  stories = uid => this.storage.ref(`stories/${uid}/`);

  chapterFiles = (uid, title) => this.storage.ref(`stories/${uid}/${title}/`);

  images = uid => this.storage.ref(`images/${uid}/`);

  navigationItemsOfUser = uid => this.db.ref(`navItems/${uid}`);
}

export default Firebase;

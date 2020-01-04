import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import { withFirebase } from "src/shared/firebase";
import * as ROUTES from "../../constants/routes";

const SignUpPage = () => (
  <div>
    <SignUpForm />
  </div>
);
const INITIAL_STATE = {
  email: "",
  password: "",
  firstName: ""
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    const { email, password, firstName } = this.state;
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        this.props.firebase.user(authUser.user.uid).set({ firstName, email });
        this.props.history.push(ROUTES.WRITE_STORY);
      })
      .catch(error => {
        console.log(error);
      });
    event.preventDefault();
  };

  render() {
    const { email, password, firstName } = this.state;
    const isInvalid = password === "" || email === "";
    return (
      <div className="flex justify-center">
        <form
          onSubmit={this.onSubmit}
          className="mt-48 w-1/3 bg-white shadow-md rounded px-8 py-8 pt-8"
        >
          <div className="px-4 pb-4">
            <span className="font-bold text-xl">Create your account</span>
            <label
              htmlFor="email"
              className="mt-2 text-sm block font-bold  pb-2"
            >
              USER NAME
            </label>
            <input
              type="text"
              name="firstName"
              onChange={e => this.onChange(e)}
              value={firstName}
              id="firstName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 "
              placeholder="John Doe"
            />
          </div>
          <div className="px-4 pb-4">
            <label
              htmlFor="email"
              className="mt-2 text-sm block font-bold  pb-2"
            >
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              name="email"
              onChange={e => this.onChange(e)}
              value={email}
              id="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 "
              placeholder="Johnbull@example.com"
            />
          </div>
          <div className="px-4 pb-4">
            <label htmlFor="password" className="text-sm block font-bold pb-2">
              PASSWORD
            </label>
            <input
              type="password"
              name="password"
              onChange={e => this.onChange(e)}
              value={password}
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex justify-center">
            <button
              disabled={isInvalid}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          </div>
          <SignUpLink />
        </form>
      </div>
    );
  }
}

const SignUpLink = () => (
  <p>
    Already have an account?? <Link to={ROUTES.SIGN_IN}>Sign In</Link>
  </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));
export default SignUpPage;
export { SignUpForm, SignUpLink };

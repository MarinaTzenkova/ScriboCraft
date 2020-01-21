import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import { withFirebase } from "src/shared/utils/firebase";
import * as ROUTES from "src/constants/routes";

import toastr from "toastr";
import "toastr/build/toastr.min.css";

const initialState = {
  email: "",
  password: ""
};

const SignInPage = () => (
  <div>
    <SignInForm />
  </div>
);

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...initialState };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    const { email, password } = this.state;
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(response => {
        this.props.history.push(ROUTES.WRITE_STORY);
      })
      .catch(error => {
        toastr.error(error.message);
      });
    event.preventDefault();
  };

  render() {
    const { email, password } = this.state;
    const isInvalid = password === "" || email === "";
    return (
      <div className="flex justify-center mt-32 ">
        <form
          onSubmit={this.onSubmit}
          className="mt-10 w-1/3 bg-white shadow-md rounded px-8 py-8 pt-8"
        >
          <div className="px-4 pb-4">
            <span className="font-bold text-xl">Log in into your account</span>
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
              id="email"
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
          <SignInLink />
        </form>
      </div>
    );
  }
}

const SignInLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignInForm = withRouter(withFirebase(SignInFormBase));

export default SignInPage;
export { SignInForm, SignInLink };

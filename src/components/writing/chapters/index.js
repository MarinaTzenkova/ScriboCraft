import React, { Component } from "react";
import { AuthUserContext, withAuthorization } from "src/shared/utils/session";

import ChapterBox from "./chapterBox";

const INITIAL_STATE = {
  chapters: [],
  story: ""
};

class Chapters extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    this.fetchStories();
  }

  fetchStories = () => {
    const params = new URLSearchParams(this.props.location.search);
    this.setState({ story: params.get("story") });
    this.props.firebase
      .user(`${this.props.firebase.auth.getUid()}/stories`)
      .once("value")
      .then(snapshot => {
        const chapters = snapshot.val()[this.state.story];
        console.log(chapters);
        this.setState({ chapters: chapters });
      });
  };

  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            <div>
              <h1 className="text-center text-4xl text-red-900">{`Chapters of ${this.state.story}`}</h1>
              <div
                className="mt-10"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 25%)"
                }}
              >
                {this.state.chapters
                  ? Object.values(this.state.chapters).map((story, s) =>
                      story ? (
                        <ChapterBox
                          key={s}
                          chapter={story}
                          title={this.state.story}
                        />
                      ) : null
                    )
                  : null}
              </div>
            </div>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Chapters);

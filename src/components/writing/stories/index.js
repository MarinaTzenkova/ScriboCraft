import React, { Component } from "react";
import { AuthUserContext, withAuthorization } from "src/shared/utils/session";

import StoryBox from "./storyBox";

const INITIAL_STATE = {
  stories: []
};

class Stories extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchStories();
  }

  fetchStories = () => {
    this.props.firebase.allStories().once("value", snapshot => {
      if (this._isMounted) {
        const stories = snapshot.val();
        this.setState({ stories: Object.values(stories) });
      }
    });
  };

  editStoryName = (name, id) => {
    console.log(this.state.stories[id]);
    const newStories = this.state.stories.slice();
    newStories[id]["title"] = name;
    this.setState({ stories: newStories }); //set the new state
  };

  promptDeleteStory = (name, id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this story and all of it's chapters?"
      )
    ) {
      this.props.firebase
        .chapterFiles(this.props.firebase.auth.getUid(), name)
        .listAll()
        .then(res => {
          res.items.forEach(itemRef => {
            itemRef.delete();
          });
          this.props.firebase
            .userStory(this.props.firebase.auth.getUid(), name)
            .remove()
            .then(() => {
              this.props.firebase
                .story(name)
                .remove()
                .then(() => {
                  this.props.firebase
                    .user(this.props.firebase.auth.getUid())
                    .once("value")
                    .then(snapshot => {
                      const latestStory = snapshot.val().latestStory;
                      if (latestStory === name) {
                        this.props.firebase.db
                          .ref()
                          .child("/users/" + this.props.firebase.auth.getUid())
                          .update({
                            latestChapter: "",
                            latestStory: ""
                          })
                          .then(() => {
                            this.fetchStories();
                          });
                      }
                    });
                })
                .catch(error => console.log(error));
            })
            .catch(error => console.log(error));
        })
        .catch(function(error) {
          // Uh-oh, an error occurred!
        });
    }
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            <div>
              <h1 className="text-center text-4xl text-red-900 mb-5">
                Stories
              </h1>
              <div
                className="flex flex-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 25%)"
                }}
              >
                {this.state.stories.map((story, s) => (
                  <StoryBox
                    key={s}
                    story={story}
                    editName={value => this.editStoryName(value, s)}
                    deleteStory={value => this.promptDeleteStory(value, s)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Stories);

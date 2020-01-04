import React, { Component } from "react";
import { AuthUserContext, withAuthorization } from "src/shared/session";
import { Link } from "react-router-dom";

const INITIAL_STATE = {
  stories: []
};

class Stories extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    this.fetchStories();
  }

  fetchStories = () => {
    this.props.firebase
      .user(this.props.firebase.auth.getUid())
      .on("value", snapshot => {
        const stories = snapshot.val().stories;
        console.log(stories);
        this.setState({ stories: Object.keys(stories) });
      });
  };

  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div
            className="pt-20"
            style={{ display: "grid", gridTemplateColumns: "0.2fr 1fr 0.2fr" }}
          >
            <div></div>
            <div
              className="flex flex-row"
              style={{ display: "grid", gridTemplateColumns: "repeat(4, 25%)" }}
            >
              {this.state.stories.map((story, s) => (
                <StoryBox key={s} story={story} id={s} />
              ))}
            </div>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const StoryBox = ({ story, id }) => (
  <div className="m-2 border rounded border-gray-300 bg-white cursor-pointer transition pb-4 flex flex-col max-w-full">
    <Link to={`/chapters?story=${story}`}>
      <div className="flex justify-center">
        {/* {story.image ? ( */}
        <img
          src="https://tagteam.sounder.fm/img/placeholder-256x256.png"
          alt=""
        ></img>
        {/* ) : ( */}
        {/* <img src={story.image} alt=""></img>
        )} */}
      </div>
      <div className="flex justify-center text-lg font-semibold text-red-900">
        {story}
      </div>
      <div className="flex justify-center">{}</div>
    </Link>
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Stories);

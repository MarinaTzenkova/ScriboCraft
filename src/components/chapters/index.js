import React, { Component } from "react";
import { AuthUserContext, withAuthorization } from "src/shared/session";
import { Link } from "react-router-dom";

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
    console.log(params.get("story"));
    this.setState({ story: params.get("story") });
    this.props.firebase
      .user(`${this.props.firebase.auth.getUid()}/stories`)
      .on("value", snapshot => {
        
        const chapters = snapshot.val()[this.state.story];
        this.setState({ chapters: chapters });
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
              {Object.values(this.state.chapters).map((story, s) => (
                <ChapterBox key={s} story={story} id={s} />
              ))}
            </div>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const ChapterBox = ({ story, id }) => (
  <div className="m-2 border rounded border-gray-300 bg-white cursor-pointer transition pb-4 flex flex-col max-w-full">
    <Link to={"/"}>
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
        {story.date}
      </div>
      <div className="flex justify-center">{}</div>
    </Link>
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Chapters);

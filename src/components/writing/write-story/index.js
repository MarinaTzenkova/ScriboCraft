import axios from "axios";

import React, { Component } from "react";

import { AuthUserContext, withAuthorization } from "src/shared/utils/session";

import Editor from "./editor";
import Settings from "./settings";
import Menu from "./menu";

import Modal from "src/shared/components/modal";

const INITIAL_STATE = {
  data: "",
  value: [
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }]
    }
  ],
  title: "",
  hover: false,
  save: false,
  story: "",
  image: null
};

class WriteStory extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    this.fetchData().then(r => {
      this.loadStory(r.url);
    });
  }

  fetchData = () => {
    return new Promise((res, rej) => {
      const chapter = new URLSearchParams(this.props.location.search).get(
        "chapter"
      );
      const story = new URLSearchParams(this.props.location.search).get(
        "story"
      );
      if (!chapter) {
        this.props.firebase
          .user(this.props.firebase.auth.getUid())
          .once("value")
          .then(snapshot => {
            const stories = snapshot.val().stories;
            const latest = snapshot.val().latestChapter;
            const latestStory = snapshot.val().latestStory;

            if (!latest && !latestStory) return;
            const latestChapter = stories[latestStory][latest];

            this.setState({ title: latest });
            if (latestChapter) res({ url: latestChapter.url });
          });
      } else {
        this.props.firebase
          .chapter(this.props.firebase.auth.getUid(), story, chapter)
          .once("value")
          .then(snapshot => {
            const story = snapshot.val();
            this.setState({ title: story.title });
            res({ url: story.url });
          });
      }
    });
  };

  saveStory = () => {
    const metadata = {
      contentType: "application/json"
    };
    var blob = new Blob([JSON.stringify(this.state.value)], {
      type: "application/json"
    });
    this.props.firebase
      .stories(
        `${this.props.firebase.auth.getUid()}/${this.state.story}/${
          this.state.title
        }`
      )
      .put(blob, metadata)
      .then(response => {
        this.props.firebase
          .stories(
            `${this.props.firebase.auth.getUid()}/${this.state.story}/${
              this.state.title
            }`
          )
          .getDownloadURL()
          .then(url => {
            this.props.firebase.db
              .ref()
              .child("/users/" + this.props.firebase.auth.getUid())
              .update({
                latestChapter: this.state.title,
                latestStory: this.state.story
              })
              .then(() => {
                const stories = {};
                stories[`/${this.state.title}`] = {
                  url,
                  date: new Date().toLocaleString(),
                  title: this.state.title
                };
                this.props.firebase
                  .user(
                    `${this.props.firebase.auth.getUid()}/stories/${
                      this.state.story
                    }/`
                  )
                  .update(stories)
                  .then(r => {
                    this.setState({ save: false });
                  });
              })
              .catch(error => console.log(error));
          });
      })
      .catch(error => console.log(error));

    const image = this.state.image;
    if (image) {
      const imageMetadata = {
        contentType: image.type
      };
      this.props.firebase
        .images(
          `${this.props.firebase.auth.getUid()}/${+new Date()}-${
            this.state.story
          }`
        )
        .put(image, imageMetadata)
        .then(snapshot => {
          snapshot.ref.getDownloadURL().then(url => {
            this.props.firebase.story(this.state.story).update({
              image: url,
              title: this.state.story
            });
          });
        })
        .catch(error => console.log(error));
    } else {
      this.props.firebase.story(this.state.story).update({
        image: "",
        title: this.state.story
      });
    }
  };

  loadStory = url => {
    axios.get(url).then(r => {
      const value = r.data[0];
      this.setState({ value: [value] });
    });
  };

  onMouseEnter = () => {
    this.setState({ hover: true });
  };

  onMouseLeave = () => {
    this.setState({ hover: false });
  };

  closeModal = () => {
    this.setState({ save: false });
  };

  storeImage = value => {
    this.setState({ image: value.target.files[0] });
  };
  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div className="flex flex-row w-full">
            <Editor
              title={this.state.title}
              value={this.state.value}
              saveStory={this.saveStory}
              setTitle={value => this.setState({ title: value })}
              setValue={value => this.setState({ value })}
            />
            <Menu
              hover={this.state.hover}
              mouseEnter={this.onMouseEnter}
              mouseLeave={this.onMouseLeave}
              setSave={value => this.setState({ save: value })}
            />
            <Modal
              show={this.state.save}
              handleSave={this.saveStory}
              handleClose={this.closeModal}
            >
              <Settings
                setStory={value => this.setState({ story: value })}
                setImage={value => this.storeImage(value)}
                story={this.state.story}
              />
            </Modal>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(WriteStory);

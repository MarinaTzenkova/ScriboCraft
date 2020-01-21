import axios from "axios";
import React, { Component } from "react";

import { withAuthorization } from "src/shared/utils/session";
import Modal from "src/shared/components/modal";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

import Editor from "./editor";
import Settings from "./settings";
import MenuComponent from "./menu";

const INITIAL_STATE = {
  user: "",
  title: "",
  value: [
    {
      type: "paragraph",
      children: [{ text: "" }]
    }
  ],
  image: null,
  story: "",
  save: false
};

class WriteStory extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    this.setState({ user: this.props.uid });
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
          .user(this.state.user)
          .once("value")
          .then(snapshot => {
            const stories = snapshot.val().stories;
            const latest = snapshot.val().latestChapter;
            const latestStory = snapshot.val().latestStory;

            if (!latest && !latestStory) return;
            const latestChapter = stories[latestStory][latest];

            this.setState({ title: latest });
            this.setState({ story: latestStory });
            if (latestChapter) res({ url: latestChapter.url });
          });
      } else {
        this.props.firebase
          .chapter(this.props.firebase.auth.getUid(), story, chapter)
          .once("value")
          .then(snapshot => {
            const fetchedDataChapter = snapshot.val();
            this.setState({ story });
            this.setState({ title: fetchedDataChapter.title });
            res({ url: fetchedDataChapter.url });
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
      .stories(`${this.state.user}/${this.state.story}/${this.state.title}`)
      .put(blob, metadata)
      .then(response => {
        this.props.firebase
          .stories(`${this.state.user}/${this.state.story}/${this.state.title}`)
          .getDownloadURL()
          .then(url => {
            this.props.firebase.db
              .ref()
              .child("/users/" + this.state.user)
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
                  .user(`${this.state.user}/stories/${this.state.story}/`)
                  .update(stories)
                  .then(r => {
                    this.setState({ save: false });
                    toastr.success(
                      `Successfuly saved ${this.state.title} in ${this.state.story}`
                    );
                  });
              })
              .catch(error => toastr.error(error.message));
          });
      })
      .catch(error => toastr.error(error.message));

    const image = this.state.image;
    if (image) {
      const imageMetadata = {
        contentType: image.type
      };
      this.props.firebase
        .images(`${this.state.user}/${+new Date()}-${this.state.story}`)
        .put(image, imageMetadata)
        .then(snapshot => {
          snapshot.ref.getDownloadURL().then(url => {
            this.props.firebase
              .story(this.state.user, this.state.story)
              .update({
                image: url,
                title: this.state.story
              });
          });
        })
        .catch(error => console.log(error));
    } else {
      this.props.firebase.story(this.state.user, this.state.story).update({
        image: "",
        title: this.state.story
      });
    }
  };

  loadStory = url => {
    axios.get(url).then(r => {
      const value = r.data;
      this.setState({ value: value });
    });
  };

  storeImage = value => {
    this.setState({ image: value.target.files[0] });
  };

  render() {
    return (
      <div className="flex flex-row w-full">
        <Editor
          title={this.state.title}
          value={this.state.value}
          setTitle={value => this.setState({ title: value })}
          setValue={value => this.setState({ value })}
        />
        <MenuComponent setSave={value => this.setState({ save: value })} />
        <Modal
          show={this.state.save}
          handleSave={this.saveStory}
          handleClose={() => this.setState({ save: false })}
        >
          <Settings
            setStory={value => this.setState({ story: value })}
            setImage={value => this.storeImage(value)}
            story={this.state.story}
          />
        </Modal>
      </div>
    );
  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(WriteStory);

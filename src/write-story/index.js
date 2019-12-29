import axios from "axios";

import React, { Component, useMemo } from "react";

import { AuthUserContext, withAuthorization } from "../session";

import { createEditor } from "slate";

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from "slate-react";

const INITIAL_STATE = {
  data: "",
  value: [
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }]
    }
  ],
  title: ""
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
      this.props.firebase
        .user(this.props.firebase.auth.getUid())
        .on("value", snapshot => {
          const stories = Object.values(snapshot.val().stories);
          var mostRecentChapter = new Date(
            Math.max.apply(
              null,
              stories.map(e => {
                return new Date(e.date);
              })
            )
          );
          const latest = stories.filter(
            s => new Date(s.date).getTime() === mostRecentChapter.getTime()
          )[0];
          this.setState({ title: latest.title });
          res({ url: latest.url });
          // axios.get(latest.url).then(r => {
          //   this.setState({ data: r.data });
          //   console.log(r);
          //   res({ url: latest.url });
          // });
        });
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
      .stories(`${this.props.firebase.auth.getUid()}/${this.state.title}`)
      .put(blob, metadata)
      .then(response => {
        this.props.firebase
          .stories(`${this.props.firebase.auth.getUid()}/${this.state.title}`)
          .getDownloadURL()
          .then(url => {
            this.props.firebase
              .user(`${this.props.firebase.auth.getUid()}/stories`)
              .push({
                title: this.state.title,
                url,
                date: new Date().toLocaleString()
              });
          });
      })
      .catch(error => console.log(error));
  };

  loadStory = url => {
    axios.get(url).then(r => {
      const value = r.data[0];
      this.setState({ value: [value] });
    });
  };

  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <Editor
            title={this.state.title}
            value={this.state.value}
            saveStory={this.saveStory}
            setTitle={value => this.setState({ title: value })}
            setValue={value => this.setState({ value })}
          />
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const Editor = ({ title, value, saveStory, setTitle, setValue }) => {
  const editor = useMemo(() => withReact(createEditor()), []);
  return (
    <div>
      <div
        className="pt-10"
        style={{
          display: "grid",
          gridTemplateColumns: "0.2fr 1fr 0.2fr"
        }}
      >
        <div></div>
        <div>
          <div>
            <input
              className="border-b w-full font-medium text-3xl text-gray-700 outline-none"
              placeholder="Title"
              value={title}
              onChange={value => setTitle(value.target.value)}
            />
            <div
              style={{ height: "500px" }}
              className="border border-gray-500 rounded-lg w-full p-5 mt-5"
            >
              <Slate
                editor={editor}
                value={value}
                onChange={value => setValue(value)}
              >
                <Editable spellCheck autoFocus />
              </Slate>
            </div>
            <div className="w-full flex justify-center">
              <button onClick={saveStory} className="bg-gray-600 rounded-full">
                Save story
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const condition = authUser => !!authUser;

export default withAuthorization(condition)(WriteStory);

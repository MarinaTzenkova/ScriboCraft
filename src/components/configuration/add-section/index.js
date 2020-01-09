import React, { Component } from "react";
import { AuthUserContext, withAuthorization } from "src/shared/utils/session";
import Modal from "src/shared/components/modal";

const cases = {
  characters: "CharacterTemplate"
};

const INITIAL_STATE = {
  template: null,
  selectedSection: null,
  modal: false,
  components: [],
  selectedTemplate: null
};

class AddSection extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  openSelection = value => {
    switch (value) {
      case "characters":
        import(`./templates/${value}`)
          .then(component => {
            this.setState({
              components: this.state.components.concat(component.default)
            });
            this.setState({ template: cases.characters });
          })
          .catch(error => {
            console.error(`"${value}" not yet supported`);
          });
    }
    this.setState({ modal: true });
  };

  componentToRender = () => {
    const ComponentToRender = this.state.components.filter(
      x => x.name === this.state.template
    )[0];

    if (ComponentToRender)
      return React.createElement(ComponentToRender, {
        selectedTemplate: value => this.selectTemplate(value)
      });
    else return null;
  };
  selectTemplate = value => {
    this.setState({ selectedTemplate: value });
  };

  saveTemplate = () => {
    const icon = this.state.selectedTemplate.includes("character")
      ? "face"
      : "people";
    const path = this.state.selectedTemplate.includes("character")
      ? "/characters"
      : "other";
    this.props.firebase
      .section(this.props.firebase.auth.getUid())
      .update({
        icon,
        path,
        template: this.state.selectedTemplate
      })
      .then(() => {
        console.log("wee");
        this.setState({ modal: false });
      });
  };

  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            <h1 className="text-center text-3xl font-light text-red-900 mb-10">
              Select section to add on the menu bar
            </h1>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 25%)"
              }}
            >
              <div
                onClick={() => this.openSelection("characters")}
                draggable="true"
                className="m-2 p-5 font-light border rounded hover:bg-red-400 bg-white cursor-pointer flex flex-col max-w-full bg-red-200"
              >
                <h1 className="text-center text-2xl">Characters</h1>
                <span className="text-center">(prototype version)</span>
              </div>
              <div
                draggable="true"
                className="m-2 p-5 font-light border rounded hover:bg-blue-400 bg-white cursor-pointer flex flex-col max-w-full bg-blue-200"
              >
                <h1 className="text-center text-2xl">Scenes</h1>
                <span className="text-center">(prototype version)</span>
              </div>
              <div
                draggable="true"
                className="m-2 p-5 font-light border rounded hover:bg-purple-400 bg-white cursor-pointer flex flex-col max-w-full bg-purple-200"
              >
                <h1 className="text-center text-2xl">Outlines</h1>
                <span className="text-center">(prototype version)</span>
              </div>
              <div
                draggable="true"
                className="m-2 p-5 font-light border rounded hover:bg-green-400 bg-white cursor-pointer flex flex-col max-w-full bg-green-200"
              >
                <h1 className="text-center text-2xl">Timelines</h1>
                <span className="text-center">(prototype version)</span>
              </div>
              <div
                draggable="true"
                className="m-2 p-5 font-light border rounded hover:bg-teal-400 bg-white cursor-pointer flex flex-col max-w-full bg-teal-200"
              >
                <h1 className="text-center text-2xl">Tags</h1>
                <span className="text-center">(prototype version)</span>
              </div>
            </div>
            <Modal
              show={this.state.modal}
              handleSave={() => this.saveTemplate()}
              handleClose={() => this.setState({ modal: false })}
            >
              {this.componentToRender()}
            </Modal>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AddSection);

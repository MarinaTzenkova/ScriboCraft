import React, { Component } from "react";
import { AuthUserContext, withAuthorization } from "src/shared/utils/session";
import Modal from "src/shared/components/modal";
import CharacterTemplate from "./templates/characters";
import { Help } from "@material-ui/icons";
import { Tooltip, Icon } from "@material-ui/core";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

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

  // do not work on deployed version, need to look further
  openSelection = value => {
    console.log(value);
    import(/* webpackMode: "eager" */ `./templates/${value}`)
      .then(component => {
        console.log(component);
        this.setState({
          components: this.state.components.concat(component.default)
        });
        this.setState({ template: cases.characters });
        this.setState({ modal: true });
      })
      .catch(error => {
        console.error(`"${value}" not yet supported`);
      });
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
        description: "Page containing your characters.",
        template: this.state.selectedTemplate
      })
      .then(() => {
        toastr.success("Successfuly added section on the right");
        this.setState({ modal: false });
        window.location.reload();
      });
  };

  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            <div className="flex flex-row">
              <div className="flex flex-row w-2/12"></div>
              <div className="flex flex-row w-8/12 justify-center text-center text-3xl font-light text-red-900">
                Select template to add on the menu bar
              </div>
              <div className="flex flex-row w-2/12 justify-end">
                <Tooltip title="Click to learn more about each customizable component in ScriboCraft">
                  <Help
                    style={{ fontSize: "2rem", display: "none" }}
                    className="text-red-800 cursor-pointer"
                  />
                </Tooltip>
              </div>
            </div>
            <div
              className="mt-10"
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
                className="m-2 p-5 font-light border rounded bg-white cursor-pointer flex flex-col max-w-full bg-blue-200"
              >
                <h1 className="text-center text-2xl">Scenes</h1>
                <span className="text-center">(not implemented)</span>
              </div>
              <div
                draggable="true"
                className="m-2 p-5 font-light border rounded  bg-white cursor-pointer flex flex-col max-w-full bg-purple-200"
              >
                <h1 className="text-center text-2xl">Outlines</h1>
                <span className="text-center">(not implemented)</span>
              </div>
              <div
                draggable="true"
                className="m-2 p-5 font-light border rounded  bg-white cursor-pointer flex flex-col max-w-full bg-green-200"
              >
                <h1 className="text-center text-2xl">Timelines</h1>
                <span className="text-center">(not implemented)</span>
              </div>
              <div
                draggable="true"
                className="m-2 p-5 font-light border rounded bg-white cursor-pointer flex flex-col max-w-full bg-teal-200"
              >
                <h1 className="text-center text-2xl">Tags</h1>
                <span className="text-center">(not implemented)</span>
              </div>
            </div>
            <div className="w-full border border-gray-200 h-auto m-2 rounded mt-10 p-4">
              <h1 className="text-red-900 text-2xl font-light text-center">
                Template icons overview
              </h1>
              <div className="my-2 mb-4 border-b border-gray-500"></div>
              <div className="flex flex-row px-2 justify-center">
                <div className="flex items-center">
                  <Icon style={{ fontSize: "2rem" }}>face</Icon> - Character
                  section
                </div>
                <div className="flex items-center ml-2 border-l border-gray-800 pl-2">
                  <Icon style={{ fontSize: "2rem" }}>movie</Icon> - Scenes
                  section
                </div>
                <div className="flex items-center ml-2 border-l border-gray-800 pl-2">
                  <Icon style={{ fontSize: "2rem" }}>list</Icon> - Outlines
                  section
                </div>
                <div className="flex items-center ml-2 border-l border-gray-800 pl-2">
                  <Icon style={{ fontSize: "2rem" }}>timeline</Icon> - Timelines
                  section
                </div>
                <div className="flex items-center ml-2 border-l border-gray-800 pl-2">
                  <Icon style={{ fontSize: "2rem" }}>label</Icon> - Tags section
                </div>
              </div>
            </div>
            <Modal
              show={this.state.modal}
              handleSave={() => this.saveTemplate()}
              handleClose={() => this.setState({ modal: false })}
            >
              <CharacterTemplate
                selectedTemplate={value => this.selectTemplate(value)}
              />
            </Modal>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AddSection);

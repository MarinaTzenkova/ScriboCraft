import React, { Component } from "react";
import { Icon } from "@material-ui/core";

const INITIAL_STATE = {
  characters: [
    {
      name: "test"
    }
  ]
};

class Characters extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  render() {
    return (
      <div>
        <div>
          <h1 className="text-red-900 text-3xl text-center">Characters</h1>
        </div>
        <div
          className="mt-10"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 25%)"
          }}
        >
          {this.state.characters.map((character, c) => (
            <CharacterBox character={character} key={c} />
          ))}
          <div
            className="border rounded border-red-900 cursor-pointer bg-gray-200 items-center flex justify-center hover:bg-gray-400"
            style={{ height: "300px", width: "250px" }}
          >
            <Icon
              className="text-red-900"
              style={{ fontSize: "4rem" }}
              onClick={() => this.setState({ modal: true })}
            >
              add
            </Icon>
          </div>
        </div>
      </div>
    );
  }
}

const CharacterBox = () => {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat cursor-pointer border border-gray-900 rounded flex items-end justify-center"
      style={{
        height: "300px",
        width: "250px",
        backgroundImage: `url(https://cdn.myanimelist.net/images/characters/6/369047.jpg)`
      }}
    >
      <div className="rounded bg-gray-300 text-lg font-semibold px-3 mb-2">
        Character name
      </div>
    </div>
  );
};

export default Characters;

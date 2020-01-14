import React, { useState } from "react";

import { Icon } from "@material-ui/core";

import templateOne from "./template-1.png";
import templateTwo from "./template-2.png";
import "./styles.css";

const CharacterTemplate = ({ selectedTemplate }) => {
  const [selected, setSelected] = useState("child");
  const [selectedSecond, setSelectedSecond] = useState("child");
  return (
    <div className="p-10" style={{ width: "1000px" }}>
      <h1 className="text-center text-3xl font-light text-red-900 mb-10">
        Chose between these templates for your new section <Icon>face</Icon>
      </h1>
      <div className="flex flex-row w-full">
        <div className="parent">
          <div
            onClick={() => {
              setSelected("selected");
              setSelectedSecond("child");
              selectedTemplate("character-template-1");
            }}
            className={
              "rounded border border-red-900 h-64 flex items-end bg-cover bg-center bg-no-repeat " +
              selected
            }
            style={{ backgroundImage: `url(${templateOne})` }}
          ></div>
          <div className="select-none text-center font-light text-red-900">
            Text description of your character with the option to add an image.
          </div>
        </div>
        <div className="parent ml-5">
          <div
            onClick={() => {
              selectedTemplate("character-template-2");
              setSelected("child");
              setSelectedSecond("selected");
            }}
            className={
              "rounded border border-red-900 h-64 flex items-end bg-cover bg-center bg-no-repeat " +
              selectedSecond
            }
            style={{ backgroundImage: `url(${templateTwo})` }}
          ></div>
          <div className="select-none text-center font-light text-red-900">
            Fields of character attributes and image.
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterTemplate;

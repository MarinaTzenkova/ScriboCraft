import React from "react";
import ImageIcon from "@material-ui/icons/Image";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";

const Settings = ({ setStory, story, setImage }) => {
  return (
    <div className="p-5">
      <p className="text-lg text-red-900 text-center border-b">Save settings</p>
      <div
        className="mt-5"
        style={{
          display: "grid",
          gridTemplateColumns: "100px 1fr"
        }}
      >
        <div>Story folder: </div>
        <input
          type="text"
          className="border border-gray-600 rounded"
          value={story}
          onChange={value => setStory(value.target.value)}
        ></input>
        <div className="mt-5">Placeholder: </div>
        <input
          type="text"
          className="border border-gray-600 rounded mt-5"
          disabled
        ></input>
      </div>
      <div className="flex flex-row justify-between mt-10 mx-8">
        <div className="flex items-center flex-col">
          <label htmlFor="single">
            <ImageIcon
              style={{ fontSize: "6rem" }}
              className="text-red-800 cursor-pointer"
            />
          </label>
          <input
            type="file"
            id="single"
            className="invisible w-2 h-2"
            onChange={value => setImage(value)}
          />
          <p className="text-center">Upload cover image</p>
        </div>
        <div className="flex items-center flex-col">
          <label htmlFor="multiple">
            <PhotoLibraryIcon
              style={{ fontSize: "6rem" }}
              className="text-red-800 cursor-pointer"
            />
          </label>
          <input id="mutlple" className="invisible w-2 h-2" />
          <p className="text-center">Chose from existing images</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;

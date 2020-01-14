import React from "react";
import { Image, Folder, Add } from "@material-ui/icons";

const Settings = ({ setStory, story, setImage, image }) => {
  return (
    <div className="p-5" style={{ width: "400px" }}>
      <p className="text-lg text-red-900 text-center border-b">Save settings</p>
      <div className="mt-5">
        {story ? (
          <div>
            <h2 className="text-center text-red-900 tex-xl">
              Select from existing stories or create new one
            </h2>
            <div className="flex flex-row px-6 mt-5">
              <div>
                <Folder className="text-red-900" style={{ fontSize: "4rem" }} />
                <div className="text-xs">{story}</div>
              </div>
              <div className="ml-3">
                <Add className="text-red-900 " style={{ fontSize: "4rem" }} />
                <div className="text-sm">Create new</div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex flex-row">
              Story folder:
              <input
                type="text"
                className="border border-gray-600 rounded ml-4"
                value={story}
                onChange={value => setStory(value.target.value)}
              />
            </div>
            <div className="flex flex-row justify-between px-5 mt-4">
              <div className="flex justify-end items-center flex-col">
                <label htmlFor="single">
                  <Image
                    style={{ fontSize: "3rem" }}
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
                <img
                  src="https://tagteam.sounder.fm/img/placeholder-256x256.png"
                  className="w-32 h-32"
                  alt=""
                ></img>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;

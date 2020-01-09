import React, { useState } from "react";
import { Link } from "react-router-dom";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Tooltip } from "@material-ui/core";

const StoryBox = ({ story, editName, deleteStory }) => {
  const [edit, setEdit] = useState(false);
  return (
    <div className="m-2 border rounded border-gray-300 bg-white cursor-pointer transition pb-4 flex flex-col max-w-full">
      <Link to={`/chapters?story=${story.title}`}>
        <div className="flex justify-center">
          {!story.image ? (
            <img
              src="https://tagteam.sounder.fm/img/placeholder-256x256.png"
              alt=""
            ></img>
          ) : (
            <img
              style={{ widht: "256px", height: "256px" }}
              src={story.image}
              alt=""
            ></img>
          )}
        </div>
        <div className="border-b border-gray-300 my-2"></div>
      </Link>
      <div className="flex justify-center text-lg font-semibold text-red-900">
        {edit ? (
          <input
            type="test"
            value={story.title}
            onChange={value => editName(value.target.value)}
          ></input>
        ) : (
          <Link to={`/chapters?story=${story.title}`}>{story.title}</Link>
        )}
      </div>
      <div className="flex justify-end border-t px-3 pt-3 mt-2">
        <Tooltip title="Edit story name">
          <EditIcon
            onClick={() => setEdit(!edit)}
            className="mr-2 text-red-900"
            style={{ width: "25px", height: "25px" }}
          />
        </Tooltip>
        <Tooltip title="Delete story">
          <DeleteIcon
            onClick={() => deleteStory(story.title)}
            className="text-red-900"
            style={{ width: "25px", height: "25px" }}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default StoryBox;

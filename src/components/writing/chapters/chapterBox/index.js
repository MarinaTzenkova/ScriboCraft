import React, { useState } from "react";
import { Link } from "react-router-dom";

import DescriptionIcon from "@material-ui/icons/Description";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Tooltip } from "@material-ui/core";

const ChapterBox = ({ chapter, title, editName, deleteChapter }) => {
  const [edit, setEdit] = useState(false);
  return (
    <div className="m-2 border rounded border-gray-300 bg-white cursor-pointer flex flex-col max-w-full bg-red-200">
      <Link to={`/story?story=${title}&chapter=${chapter.title}`}>
        <div className="flex flex-row items-center justify-center m-5">
          <div className="mr-2">
            <DescriptionIcon style={{ width: "50px", height: "50px" }} />
          </div>
          <div>
            <Tooltip title="Story information">
              <div>
                <div className="flex justify-center"></div>
                <div className="flex justify-center text-lg font-semibold text-red-900">
                  {chapter.title}
                </div>
                <div className="flex justify-center">{chapter.date}</div>
              </div>
            </Tooltip>
          </div>
        </div>
      </Link>
      <div className="flex justify-end px-3 py-3 mt-2">
        <Tooltip title="Edit story name">
          <EditIcon
            onClick={() => setEdit(!edit)}
            className="mr-2 text-red-900"
            style={{ width: "25px", height: "25px" }}
          />
        </Tooltip>
        <Tooltip title="Delete story">
          <DeleteIcon
            onClick={() => deleteChapter(chapter.title)}
            className="text-red-900"
            style={{ width: "25px", height: "25px" }}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default ChapterBox;

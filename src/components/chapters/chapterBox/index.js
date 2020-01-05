import React from "react";
import { Link } from "react-router-dom";

import DescriptionIcon from "@material-ui/icons/Description";
import { Tooltip } from "@material-ui/core";

const ChapterBox = ({ story, title }) => (
    <div className="m-2 border rounded border-gray-300 bg-white cursor-pointer transition flex flex-col max-w-full bg-red-200">
      <Link to={`/story?story=${title}&chapter=${story.title}`}>
        <div className="flex flex-row items-center justify-center m-5">
          <div className="mr-2">
            <DescriptionIcon style={{ width: "50px", height: "50px" }} />
          </div>
          <div>
            <Tooltip title="Story information">
              <div>
                <div className="flex justify-center"></div>
                <div className="flex justify-center text-lg font-semibold text-red-900">
                  {story.title}
                </div>
                <div className="flex justify-center">{story.date}</div>
              </div>
            </Tooltip>
          </div>
        </div>
      </Link>
    </div>
  );

  export default ChapterBox;
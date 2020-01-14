import React from "react";

import { Save, GetApp, Folder, FileCopy } from "@material-ui/icons";

import { Tooltip } from "@material-ui/core";
import { Link } from "react-router-dom";

const MenuComponent = ({ hover, mouseLeave, mouseEnter, setSave }) => (
  <div className="ml-8 mt-6 cursor-pointer">
    <div>
      <div
        className="mt-2"
        style={{
          display: "grid",
          gridTemplateRows: `repeat(3, 1fr)`,
          gridRowGap: "1rem"
        }}
      >
        <Tooltip title="Save story">
          <Save onClick={e => setSave(true)} />
        </Tooltip>
        <Tooltip title="Export story (currently not working)">
          <GetApp />
        </Tooltip>
        <Tooltip title="Duplicate story">
          <FileCopy />
        </Tooltip>
        <Tooltip title="Go to story folder">
          <Link to={`/stories`}>
            <Folder />
          </Link>
        </Tooltip>
      </div>
    </div>
  </div>
);

export default MenuComponent;

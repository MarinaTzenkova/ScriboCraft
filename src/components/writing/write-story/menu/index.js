import React from "react";

import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import SaveIcon from "@material-ui/icons/Save";
import GetAppIcon from "@material-ui/icons/GetApp";
import FolderIcon from "@material-ui/icons/Folder";

import { Tooltip } from "@material-ui/core";
import { Link } from "react-router-dom";

const Menu = ({ hover, mouseLeave, mouseEnter, setSave }) => (
  <div className="ml-8 mt-6 cursor-pointer">
    <div
    // onMouseEnter={mouseEnter}
    // onMouseLeave={mouseLeave}
    >
      {/* {!hover ? <MenuIcon /> : <CloseIcon />}
      {hover ? ( */}
      <div
        className="mt-2"
        style={{
          display: "grid",
          gridTemplateRows: `repeat(3, 1fr)`,
          gridRowGap: "1rem"
        }}
      >
        <Tooltip title="Save story">
          <SaveIcon onClick={e => setSave(true)} />
        </Tooltip>
        <Tooltip title="Export story (currently not working)">
          <GetAppIcon />
        </Tooltip>
        <Tooltip title="Go to story folder">
          <Link to={`/stories`}>
            <FolderIcon />
          </Link>
        </Tooltip>
      </div>
      {/* ) : null} */}
    </div>
  </div>
);

export default Menu;

import React, { useState } from "react";
import DescriptionIcon from "@material-ui/icons/Description";
import FolderIcon from "@material-ui/icons/Folder";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";
import Icon from "@material-ui/core/Icon";

const NavComponent = props => {
  return (
    <div className="flex justify-center">
      <Link to={props.navigation.path}>
        {props.navigation.type === "write" ? (
          <DescriptionIcon
            style={{ fontSize: "2rem" }}
            className="text-red-800"
          />
        ) : props.navigation.type === "stories" ? (
          <FolderIcon style={{ fontSize: "2rem" }} className="text-red-800" />
        ) : props.navigation.type === "add" ? (
          <AddIcon style={{ fontSize: "2rem" }} className="text-red-800" />
        ) : (
          <Icon style={{ fontSize: "2rem" }} className="text-red-800">
            {props.navigation.icon}
          </Icon>
        )
        // null
        }
      </Link>
    </div>
  );
};

export default NavComponent;

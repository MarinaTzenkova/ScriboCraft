import React from "react";
import { Description, Folder, Add } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { Tooltip, Icon } from "@material-ui/core";

const NavComponent = props => {
  return (
    <div className="flex justify-center">
      <Link to={props.navigation.path}>
        {props.navigation.type === "write" ? (
          <Tooltip title={props.navigation.description}>
            <Description
              style={{ fontSize: "2rem" }}
              className="text-red-800 hover:text-red-900"
            />
          </Tooltip>
        ) : props.navigation.type === "stories" ? (
          <Tooltip title={props.navigation.description}>
            <Folder
              style={{ fontSize: "2rem" }}
              className="text-red-800 hover:text-red-900"
            />
          </Tooltip>
        ) : props.navigation.type === "add" ? (
          <Tooltip title={props.navigation.description}>
            <Add
              style={{ fontSize: "2rem" }}
              className="text-red-800 hover:text-red-900"
            />
          </Tooltip>
        ) : (
          <Tooltip title={props.navigation.description}>
            <Icon
              style={{ fontSize: "2rem" }}
              className="text-red-800 hover:text-red-900"
            >
              {props.navigation.icon}
            </Icon>
          </Tooltip>
        )}
      </Link>
    </div>
  );
};

export default NavComponent;

import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../constants/routes";

const Navigation = () => (
  <div
    style={{
      position: "fixed",
      top: "0",
      left: "0",
      height: "100%"
    }}
    className="w-24 bg-gray-300"
  >
    <ul>
      <li>
        <Link to={ROUTES.WRITE_STORY}>Write a story</Link>
      </li>
      <li>
        <Link to={ROUTES.STORIES}>Stories</Link>
      </li>
      <li>
        <Link to={ROUTES.ADD_SECTION}>Add new section</Link>
      </li>
    </ul>
  </div>
);

export default Navigation;

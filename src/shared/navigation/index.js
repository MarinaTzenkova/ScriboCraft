import React from "react";
import SignOutButton from "src/components/signout";
import NavComponent from "./navComponent";
import MenuIcon from "@material-ui/icons/Menu";
import { AuthUserContext } from "src/shared/session";

const Navigation = () => {
  const navItems = [
    { type: "write", path: "/story" },
    { type: "stories", path: "/stories" },
    { type: "add", path: "/add-section" }
  ];
  return (
    <div>
      <AuthUserContext.Consumer>
        {authUser => authUser ? (
          <div
            style={{
              position: "fixed",
              top: "0",
              left: "0",
              height: "100%"
            }}
            className="w-24 bg-gray-300"
          >
            <div className="flex justify-center py-10 pt-5">
              <MenuIcon style={{ fontSize: "2rem" }} className="text-red-800" />
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateRows: `repeat(${navItems.length}, 1fr)`,
                gridRowGap: "1rem"
              }}
            >
              {navItems.map((nav, i) => (
                <NavComponent key={i} navigation={nav} />
              ))}
            </div>
            <SignOutButton />
          </div>
        ) : (
          <div />
        )}
      </AuthUserContext.Consumer>
    </div>
  );
};

export default Navigation;

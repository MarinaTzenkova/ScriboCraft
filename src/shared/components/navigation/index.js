import React from "react";
import NavComponent from "./navComponent";
import { AuthUserContext } from "src/shared/utils/session";
import logo from "./logo_transparent.png";

const Navigation = ({ children, navigationItems }) => {
  return (
    <div>
      <AuthUserContext.Consumer>
        {authUser =>
          authUser ? (
            <div>
              <div
                style={{
                  position: "fixed",
                  top: "0",
                  left: "0",
                  height: "100%"
                }}
                className="w-24 bg-gray-300"
              >
                <div className="flex justify-center mb-10">
                  <img src={logo} className="w-20" alt="" />
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateRows: `repeat(${navigationItems.length}, 1fr)`,
                    gridRowGap: "1rem"
                  }}
                >
                  {navigationItems.map((nav, i) =>
                    nav ? <NavComponent key={i} navigation={nav} /> : null
                  )}
                </div>
              </div>
              <div>{children}</div>
            </div>
          ) : (
            <div />
          )
        }
      </AuthUserContext.Consumer>
    </div>
  );
};

export default Navigation;

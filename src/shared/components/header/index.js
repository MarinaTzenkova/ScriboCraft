import React from "react";
import { Search, AccountCircle } from "@material-ui/icons";
import { AuthUserContext } from "src/shared/utils/session";
import { Link } from "react-router-dom";

const Header = ({ children }) => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? (
          <div>
            <div
              style={{
                position: "fixed",
                top: "0",
                right: "0",
                width: "93.7%",
                height: "10%",
                zIndex: "0"
              }}
              className="bg-gray-100"
            >
              <div className="px-10 items-center h-full flex justify-end">
                <Search
                  style={{ fontSize: "2rem" }}
                  className="text-red-800 cursor-pointer"
                />
                <Link to="/account">
                  <AccountCircle
                    style={{ fontSize: "2rem" }}
                    className="text-red-800 cursor-pointer ml-5"
                  />
                </Link>
              </div>
            </div>
            <div className="pl-64 pr-40 pt-32">{children}</div>
          </div>
        ) : (
          <div>{children}</div>
        )
      }
    </AuthUserContext.Consumer>
  </div>
);

export default Header;

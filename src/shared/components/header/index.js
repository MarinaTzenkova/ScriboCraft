import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { AuthUserContext, withAuthorization } from "src/shared/utils/session";

const Header = ({ children }) => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? (
          <div
            style={{
              position: "fixed",
              top: "0",
              right: "0",
              width: "93.7%",
              height: "10%",
              zIndex: "-9999"
            }}
            className="bg-gray-100"
          >
            <div className="px-10 items-center h-full flex justify-end">
              <SearchIcon
                style={{ fontSize: "2rem" }}
                className="text-red-800 cursor-pointer"
              />
              <AccountCircleIcon
                style={{ fontSize: "2rem" }}
                className="text-red-800 cursor-pointer ml-5"
              />
            </div>
            <div className="px-20 py-10">{children}</div>
          </div>
        ) : (
          <div>{children}</div>
        )
      }
    </AuthUserContext.Consumer>
  </div>
);


export default Header;

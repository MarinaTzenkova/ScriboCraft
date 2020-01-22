import React, { Component } from "react";
import { withAuthorization } from "src/shared/utils/session";

class Account extends Component {
  render() {
    return (
      <div className="flex flex-col w-full mt-20">
        <div className="bg-red-300 w-full rounded-lg border border-gray-200 relative">
          <div
            className="absolute z-10 bg-red-200 rounded-full shadow-2xl"
            style={{
              left: "50%",
              width: "150px",
              height: "150px",
              marginLeft: "-75px",
              marginTop: "-75px"
            }}
          >
            <div
              className="flex flex-col justify-center items-center"
              style={{ height: "140px" }}
            >
              <div className="flex bg-white rounded-full h-10 w-10"></div>
              <div className="flex bg-black rounded-tr-full rounded-tl-full h-20 w-20"></div>
            </div>
          </div>
          <div className="mt-12 p-8">
            <div className="text-center font-light text-3xl">User name</div>
            <div className="text-center">Level: 1</div>
            <div className="bg-red-400 w-full h-20 rounded mt-5 border-gray-500 relative">
              <div
                className="text-xl text-red-900 bg-red-100 rouded-lg w-32 rounded-lg absolute text-center shadow-2xl border border-gray-300"
                style={{ marginTop: "-15px", marginLeft: "-15px" }}
              >
                User stats
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Account);

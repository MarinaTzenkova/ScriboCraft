import React from "react";
import { Icon } from "@material-ui/core";
import { Description, Folder, Add, Edit, Delete } from "@material-ui/icons";
import { AuthUserContext, withAuthorization } from "src/shared/utils/session";
const Home = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser => (
        <div>
          <h1 className="text-center text-3xl text-red-900">
            Welcome to ScriboCraft!
          </h1>
          <p className="mt-2 text-center border-b pb-5">
            This project serves as a prototype for my path to ReactJS and also
            my dream of making a platform for writers.
          </p>
          <div className="mt-5 flex items-center font-bold">
            There are three main sections in this website as seen below
            {/* <img src={menu} alt="" className="ml-4" /> */}
          </div>
          <div className="flex flex-col py-2 px-1">
            <div className="flex flex-row mt-4">
              <Description
                style={{ fontSize: "2rem" }}
                className="text-red-800 hover:text-red-900"
              />
              <div className="ml-2 flex items-center">
                Clicking this icon will open the text editor, where you can
                write your stories and save them in folders.
              </div>
            </div>
            <div className="flex flex-row mt-4">
              <Folder
                style={{ fontSize: "2rem" }}
                className="text-red-800 hover:text-red-900"
              />
              <div className="ml-2 flex items-center">
                Clicking this icon will open the saved story folders. You can
                modify the story name by clicking the <Edit className="mx-2" />{" "}
                icon. You can also delete a story, by clicking the{" "}
                <Delete className="mx-2" /> icon.
              </div>
            </div>
            <div className="flex flex-row mt-4">
              <Add
                style={{ fontSize: "2rem" }}
                className="text-red-800 hover:text-red-900"
              />
              <div className="ml-2 flex items-center">
                Clicking this icon will open the section add page. In this page
                you can select from multiple predefined sections to add to your
                liking. These sections will be stored on your account and will
                be available anytime you enter the webpage. For each section you
                have the option of selecting from predefined templates.
                Depending on what you chose, your page design will change.
              </div>
            </div>
            <div className="flex flex-row mt-4 font-semibold">
              Currently there is one custom section supported - Characters. The
              icon would appear as <Icon className="mx-2">face</Icon> on the
              right.
            </div>
          </div>
        </div>
      )}
    </AuthUserContext.Consumer>
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Home);

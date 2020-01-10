import React from "react";
import { Icon } from "@material-ui/core";
import menu from "./images/menu.png";

const Home = () => (
  <div>
    <h1 className="text-center text-3xl text-red-900">
      Welcome to ScriboCraft!
    </h1>
    <p className="mt-2 text-center border-b pb-5">
      This project serves as a prototype for my path to ReactJS and also my
      dream of making a platform for writers.
    </p>
    <div className="mt-5 flex items-center">
      There are three main sections in this website as seen on the right    
      <img src={menu} alt="" className="ml-4" />
    </div>
  </div>
);

export default Home;

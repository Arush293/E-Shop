import React from "react";
import PrimarySearchAppBar from "./navbar/Navbar.js";
import MySignIn from "./form/SignIn.js";
import "../assets/index.css";

export default function Login(){
  return (
    <div style={{margin: 0}}>
      <PrimarySearchAppBar />
      <MySignIn />
    </div>
  );
}

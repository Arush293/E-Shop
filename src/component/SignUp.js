import React from "react";
import PrimarySearchAppBar from "./navbar/Navbar.js";
import MyRegistration from "./form/Registration.js";
import "../assets/index.css";

export default function SignUp(){
  return (
    <div style={{margin: 0}}>
      <PrimarySearchAppBar />
      <MyRegistration />
    </div>
  );
}

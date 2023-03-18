import React from "react";
<<<<<<< HEAD:front-end/src/pages/landing/begin/Begin.jsx
//import { Navigate, useSearchParams } from "react-router-dom"
import {BeginComponent} from "./BeginComponent.jsx";

export function Begin() {
  const handleSubmit = async e => {
    // prevent the HTML form from actually submitting... we use React's javascript code instead
    e.preventDefault();
  };

    return (
      <div>
        {<BeginComponent handleSubmit={handleSubmit}/>}
      </div>
    );
=======
import BeginComponent from "../../containers/BeginComponent";
import BackButton from "../../containers/BackButton";

export default function Login() {
  function handleClick(e) {
    history.push("/");
  }
  return (
    <div className="Login">
      <BackButton url="/" handleSubmit={handleClick}/>
      <BeginComponent />
    </div>
  );
>>>>>>> master:front-end/src/pages/Login/index.jsx
}

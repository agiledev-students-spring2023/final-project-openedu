import React from "react";

import {BeginComponent}from "./BeginComponent.jsx";
import {BackButton} from "../../../containers/BackButton/BackButton.jsx";

export function Begin(props) {
  function handleClick(e) {
    // history.push("/");
  }
  return (
    <div>
      <BackButton url="/" handleSubmit={handleClick}/>
      <BeginComponent />
    </div>
  );
}

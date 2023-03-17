import React, { useState } from "react";
//import { Navigate, useSearchParams } from "react-router-dom"
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
}

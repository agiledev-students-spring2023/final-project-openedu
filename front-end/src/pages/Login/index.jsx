import React from "react";
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

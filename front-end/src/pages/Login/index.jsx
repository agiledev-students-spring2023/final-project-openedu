import React, { useState } from "react";
//import { Navigate, useSearchParams } from "react-router-dom"
import BeginComponent from "../../containers/BeginComponent";

export default function Login() {
  const [email, setEmail] = useState("");
  const handleSubmit = () => {
    if (email.trim() !== "") {
      console.log("Submitting email: ", email);
    }
  };

    return (
      <div className="Login">
        {<BeginComponent email={email} setEmail={setEmail} handleSubmit={handleSubmit} />}
      </div>
    );
}
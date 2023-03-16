import React from "react";
//import { Navigate, useSearchParams } from "react-router-dom"
import BeginComponent from "../../containers/BeginComponent";

export default function Login() {
 
  const handleSubmit = async e => {
    // prevent the HTML form from actually submitting... we use React's javascript code instead
    e.preventDefault();
  };

    return (
      <div className="Login">
        {<BeginComponent handleSubmit={handleSubmit}/>}
      </div>
    );
}
import React from "react";
//import { Navigate, useSearchParams } from "react-router-dom"
import {SignInComponent} from "./SignInComponent.jsx";

// eslint-disable-next-line
export const SignIn = props => {
 
  const handleSubmit = async e => {
    // prevent the HTML form from actually submitting... we use React's javascript code instead
    e.preventDefault();

  };

    return (
      <div>
        <SignInComponent handleSubmit={handleSubmit}/>
      </div>
    );
};
import React from "react";
//import { Navigate, useSearchParams } from "react-router-dom"
import {SignUpComponent} from "./SignUpComponent.jsx";
// eslint-disable-next-line
export const SignUp = props => {
 
  const handleSubmit = async e => {
    // prevent the HTML form from actually submitting... we use React's javascript code instead
    e.preventDefault();
  };

    return (
        <SignUpComponent handleSubmit={handleSubmit}/>
    );
};
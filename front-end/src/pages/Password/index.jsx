import React from "react";
//import { Navigate, useSearchParams } from "react-router-dom"
import LoginComponent from "../../containers/LoginComponent";

// eslint-disable-next-line
const Password = props => {
 
  const handleSubmit = async e => {
    // prevent the HTML form from actually submitting... we use React's javascript code instead
    e.preventDefault();
  };

    return (
      <div className="Password">
        <LoginComponent handleSubmit={handleSubmit}/>
      </div>
    );
};

export default Password;
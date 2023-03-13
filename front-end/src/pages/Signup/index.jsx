import React from "react";
//import { Navigate, useSearchParams } from "react-router-dom"
import SignupComponent from "../../containers/SignupComponent";

/*signup page 
if email doesn't match any account*/

// eslint-disable-next-line
const Signup = props => {
 
  const handleSubmit = async e => {
    // prevent the HTML form from actually submitting... we use React's javascript code instead
    e.preventDefault();
  };

    return (
      <div className="Signup">
        <SignupComponent handleSubmit={handleSubmit}/>
      </div>
    );
};

export default Signup;
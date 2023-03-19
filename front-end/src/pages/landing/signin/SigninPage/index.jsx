import React, { useState } from "react";
//import { Navigate, useSearchParams } from "react-router-dom"
import { SignInComponent } from "./SignInComponent.jsx.js";
import { BeginPage } from "../begin/index.jsx.js";
// eslint-disable-next-line
// Signin composes signin and begin and signup
export const SignIn = props => {
  const [begin, setBegin] = useState(true)
  const [signin, setSignin] = useState(false)
  const [signup, setSignup] = useState(false)
  const handleSubmit = async e => {
    e.preventDefault();

  };

  return (
    <Box>
      {if(begin) return <Begin/>}
    </Box>
  );
};
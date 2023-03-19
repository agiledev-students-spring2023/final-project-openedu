import React, { useState } from "react";
import { Box } from "@mui/material";
import { SignInComponent } from "./SignInComponent";
import { BeginPage } from "../Begin/BeginPage";
import { SignupPage } from "../Signup/SignupPage";
// eslint-disable-next-line
// Signin composes signin and begin and signup
export const SigninPage = props => {
  

  const handleSubmit = async e => {
    e.preventDefault();
  };


  return (
    <Box>
      <SignInComponent/>
    </Box>
  );
};
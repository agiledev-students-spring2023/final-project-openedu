import React, { useState, useEffect } from "react"
//import { Navigate, useSearchParams } from "react-router-dom"
import { Typography, Box, Container } from '@mui/material'

const Login = props => {
 
  const handleSubmit = async e => {
    // prevent the HTML form from actually submitting... we use React's javascript code instead
    e.preventDefault()
  }

    return (
      <div className="Login">
        <button>Back</button>
        <Box sx={{
        height: { xs: 350, md: 400, lg: 600 },
      }}>

        <Typography sx={{
          paddingTop: '295px',
          fontSize: { xs: '50px', md: '100px', lg: '120px' },
          fontWeight: 'bold',
          color: 'Black'
        }}>
          Begin
        </Typography>

      </Box>
        <p className="feedback">
          Let's start with your email.
        </p>
        <section className="main-content">
          <form onSubmit={handleSubmit}>
            {
              //handle error condition
            }
            <label>Username: </label>
            <input type="email" name="Email" placeholder="abc@nyu.edu" />
            <br />
            <br />
            <input type="submit" value="Continue" />
          </form>
        </section>
      </div>
    )
}

export default Login

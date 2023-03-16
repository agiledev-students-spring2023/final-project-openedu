import React from 'react';
import { Typography, Box, TextField, Button } from '@mui/material';



// eslint-disable-next-line
const LoginComponent = props =>{
    return (
      <div className="LoginComponent">
        
        <Button
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          padding: "0px",
          gap: "8px",

          position: "absolute",
          width: "83px",
          height: "40px",
          left: "360px",
          top: "29px",

          background: "#FFFFFF",
          border: "2px solid #000000",
          variant: "text",
          color: "#000000",
        }}
        >
        Back
        </Button>

        <Box sx={{
          height: { xs: 350, md: 200, lg: 450 },
        }}>
  
        <Typography sx={{
            paddingTop: '120px',
            fontSize: { xs: '30px', md: '50px', lg: '80px' },
            fontWeight: 'bold',
            color: 'Black'
          }}>
            Password
        </Typography>

        <Typography sx={{
            paddingTop: '60px',
            fontSize: { xs: '30px', md: '50px', lg: '30px' },
            fontWeight: 'bold',
            color: 'Black'
          }}>
            Welcome Back, <br />
            Hooao!
        </Typography>  
  
        </Box>
          <section className="main-content">
            <form onSubmit>
              <TextField 
              id="filled-basic" 
              type="password" 
              label="Password" 
              variant="filled" 
              placeholder="********" />
              <br />
              <br />
              <input type="submit" value="Continue" />
            </form>
          </section>
        </div>
    );
  };

export default LoginComponent;


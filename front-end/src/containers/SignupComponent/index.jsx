import React from 'react';
import { Typography, Box, TextField, Button } from '@mui/material';




// eslint-disable-next-line
const SignupComponent = props =>{
    return (
      <div className="SignupComponent">

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

        <Button
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          padding: "0px",
          gap: "8px",

          position: "absolute",
          width: "123px",
          height: "40px",
          left: "700px",
          top: "550px",

          background: "#FFFFFF",
          border: "2px solid #000000",
          variant: "text",
          color: "#000000",
        }}
      >
        Continue
      </Button>

        <Box sx={{
          height: { xs: 350, md: 200, lg: 450 },
        }}>
  
          <Typography sx={{
            position: "absolute",
            width: "167px",
            height: "70px",
            left: "580px",
            top: "115px",

            fontSize: '80px',
            fontWeight: 'bold',
            color: 'Black'
          }}>
            Password
          </Typography>
          
          <Typography sx={{
            position: "absolute",
            width: "367px",
            height: "50px",
            left: "580px",
            top: "255px",

            //paddingTop: '60px',
            fontSize: '20px',
            fontWeight: 'bold',
            color: 'Black'
          }}>
            8 Characters Minimum <br />
            At least one uppercase letter <br />
            One special character 
          </Typography>
  
        <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: "0px",

          position: "absolute",
          width: "349px",
          height: "56px",
          left: "590px",
          top: "433px",

          background: "#E7E7E7",
          borderRadius: "0px",
        }}
      >
        <TextField
          type="password"
          label="Password"
          placeholder="********"
          variant="outlined"
          sx={{ width: "349px", height: "56px" }}
        />
      </Box>

      </Box>
         
      </div>

    );
  };

export default SignupComponent;


import React from 'react';
import { Typography, Box, TextField } from '@mui/material';

//signup page component

// eslint-disable-next-line
const SignupComponent = props =>{
    return (
      <div className="SignupComponent">

        <div style={{float: 'left'}}>
          <button>Back</button>
        </div> 

          <Box sx={{
          height: { xs: 350, md: 200, lg: 450 },
        }}>
  
          <Typography sx={{
            paddingTop: '80px',
            fontSize: { xs: '30px', md: '50px', lg: '80px' },
            fontWeight: 'bold',
            color: 'Black'
          }}>
            Password
          </Typography>
          
          <Typography sx={{
            paddingTop: '50px',
            fontSize: { xs: '30px', md: '50px', lg: '20px' },
            fontWeight: 'bold',
            color: 'Black'
          }}>
            8 Characters Minimum <br />
            At least one uppercase letter <br />
            One special character 
          </Typography>
  
        </Box>
          <section className="main-content">
            <form onSubmit>
              <TextField id="filled-basic" type="password" label="Password" variant="filled" placeholder="********" />
              <br />
              <br />
              <input type="submit" value="Continue" />
            </form>
          </section>
        </div>
    );
  };

export default SignupComponent;


import React from 'react'
import { Typography, Box, TextField } from '@mui/material'

const BeginComponent = props =>{
    return (
      <div className="BeginComponent">
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
            <form onSubmit={props.handleSubmit}>
              <TextField id="filled-basic" type="email" label="Email" variant="filled" placeholder="abc@nyu.edu" />
              <br />
              <br />
              <input type="submit" value="Continue" />
            </form>
          </section>
        </div>
    )
  }

export default BeginComponent
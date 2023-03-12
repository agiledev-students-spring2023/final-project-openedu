import React from 'react';

import { Typography, Box, Container } from '@mui/material';

// This is an example page, called Index

export default function Index() {

  return (
    <div>
      <Box sx={{
        height: { xs: 350, md: 400, lg: 600 },
      }}>

        <Typography sx={{
          paddingTop: '100px',
          fontSize: { xs: '50px', md: '100px', lg: '120px' },
          fontWeight: 'bold',
          color: 'Blue'
        }}>
          Start Here
        </Typography>

      </Box>
      <Container maxWidth='lg'>
        <Box sx={{
          paddingTop: '100px',
          marginBottom: '200px'
        }}>
          <Typography sx={{
            paddingTop: '10px',
            fontSize: { xs: '15px', md: '25px', lg: '32px' },
            fontWeight: 'bold',
            color: 'black',
            float: 'left'
          }}>
            Guess You Like...
          </Typography>
        </Box>
      </Container>

    </div>
  );
}

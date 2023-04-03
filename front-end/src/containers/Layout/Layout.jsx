import React from 'react';
import { Box, Container } from '@mui/material';
import { BottomNavBar } from '../BottomNavBar/BottomNavBar';

// eslint-disable-next-line react/prop-types
export const Layout = ({ children }) => (
  <>
    <Box>
        {/*<Header />*/}
      <Container sx={{ width: "100%" }}>
        {children}
      </Container>

      {/* This is for Horizontal screen */}
      <Box sx={{ marginBottom: '10%' }}></Box>
      <BottomNavBar />
    </Box>
  </>
);
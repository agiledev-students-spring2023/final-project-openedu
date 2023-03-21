import React from 'react';
import { useState } from 'react';
import { Box, Button, Container } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { BottomNavBar } from '../BottomNavBar/BottomNavBar';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  // Here is a placeholder for future PubSub
  // Arrow disappears when it's in initial/special pages
  const [backArrow, setBackArrow] = useState(true);
  const naviagte = useNavigate();

  const handleGoBack = () => {
    naviagte(-1);
  };

  return (
    <Box sx={{
      paddingBottom: "14%",
    }}>
      <Box
        sx={{
          position: "fixed",
          marginTop: "5%",
          flexDirection: "row",
          zIndex: '100'
        }}>
        <Button disableRipple variant="plain" size="small"
          sx={{
            display: backArrow ? 'flex' : 'none',
            width: "10px",
            height: "40px",
          }}
          onClick={handleGoBack}
        > <ChevronLeftIcon
            sx={{
              fontSize: "40px"
            }} /></Button>
      </Box>
    </Box>
  );
};
// eslint-disable-next-line react/prop-types
export const Layout = ({ children }) => (
  <>
    <Box>
      <Header />
      <Container sx={{ width: "100%" }}>
        {children}
      </Container>

      {/* This is for Horizontal screen */}
      <Box sx={{ marginBottom: '10%' }}></Box>
      <BottomNavBar />
    </Box>
  </>
);
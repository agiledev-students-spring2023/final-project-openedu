import React from 'react';
import { useState } from 'react';
import { Box, Button, Container } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { BottomNavBar } from '../BottomNavBar/BottomNavBar';

const Header = () => {
  // Hereis a place holder for future PubSub
  // Arrow disappears when it's in initial/special pages
  const [backArrow, setBackArrow] = useState(true)
  return (
    <Box sx={{
      marginTop: "5%",
      flexDirection: "row",
    }}>
      <Button variant="plain" size="small"
        sx={{
          position: "relative",
          left: "3%",
          display: backArrow ? 'flex' : 'none',
          width: "10px",
          height: "40px"
        }}
      > <ChevronLeftIcon
          sx={{
            fontSize: "40px"
          }} /></Button>
    </Box>
  )
}
// eslint-disable-next-line react/prop-types
export const Layout = ({ children }) => (
  <>
    <Box>
      <Header />
      <Container sx={{width:"100%"}}>
        {children}
      </Container>
      <BottomNavBar />
    </Box>
  </>
);
import React, {useEffect} from 'react';
import { useState } from 'react';
import { Box, Button, Container } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { BottomNavBar } from '../BottomNavBar/BottomNavBar';
import { useNavigate } from 'react-router-dom';
import * as Util from "../../util/Util.mjs";
import * as Logger from "../../util/Logger.mjs";

let onEnable;

const Header = () => {
  // Here is a placeholder for future PubSub
  // Arrow disappears when it's in initial/special pages
  const [backArrow, setBackArrow] = useState(true);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };


  useEffect(() => {
      onEnable ??= (newState) => {
          Logger.info(`Back button is currently ${newState ? "ENABLED" : "DISABLED"}`);
          setBackArrow(newState);
      };
      Util.addCallback("onBackEnable",onEnable);
  },[]);
    
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
          onClick={backArrow ? handleGoBack : undefined}
        > <ChevronLeftIcon
            sx={{
              fontSize: "40px"
            }} />
        </Button>

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
import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Box, Button, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import BackgroundImage from "../../containers/BackgroundImage";
import * as Logger from "../../util/Logger.mjs";
import { mockImageApi } from "../../mockApi/apis.mjs";
import logo from "../../img/logo.png"

// This is an example page, called Home

export function Home(props) {
  const navigate = useNavigate();

  Logger.info("Home rendered!");

  return (
    <Box sx={{
      flexDirection: 'column',
      marginLeft: '3.5%'
    }}>
      <BackgroundImage />

      <Box>
        <Box
          sx={{
            marginTop: '56%',
            height: '52px',
            backgroundImage: `url(${logo})`,
            backgroundSize: 'contain',

            backgroundRepeat: 'no-repeat',
            display: 'flex'
          }} />

        <Divider color='#D9D9D9'
          sx={{
            width: '70%',
            borderBottomWidth: 5,
            marginTop: '2%'
          }} />
      </Box>

      <Box sx={{
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginTop: '8%'
      }}>
        <Typography variant="h5" sx={{ display: 'flex', fontWeight: 400 }}>The</Typography>
        <Typography variant="h3" sx={{ display: 'flex', fontWeight: 800 }}>All-in-one</Typography>
        <Typography variant="h5" sx={{ display: 'flex', fontWeight: 400 }}>Computer Science </Typography>
        <Typography variant="h5" sx={{ display: 'flex', fontWeight: 400 }}>Learning Platform</Typography>
      </Box>

      <Button
        variant='contained'
        sx={{
          display: "flex",
          width: "42%",
          borderRadius: 2,
          fontSize: '100%',
          marginTop: '15%'
        }}
        onClick={() => { navigate('/signin') }}>
        <AddIcon />
        Get Started </Button>
    </Box >
  );
}

import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {Typography, Box, Button, Divider, Backdrop} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import BackgroundImage from "../../containers/BackgroundImage";
import * as Logger from "../../util/Logger.mjs";
import logo from "../../img/logo.png";
import * as Util from "../../util/Util.mjs";

// This is an example page, called Landing

export function Landing() {
  const navigate = useNavigate();

  Logger.info("Landing rendered!");

  useEffect(() => {
      Logger.verbose("Hide nav bar!");
      Util.invokeCallback("onNavBarShow",false);
      Util.invokeCallback("onBackEnable",false);

  },[]);


  return Util.asChildPage(
    <>
        <BackgroundImage />

        <Backdrop sx={{zIndex: 0}} open>

            <Box sx={{
                flexDirection: 'column',
                marginLeft: '20px',
                width: "100%",
            }}>
                <Box
                    sx={{
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


                <Typography variant="h5" sx={{ display: 'flex', fontWeight: 400,marginTop:'10px'}}>The</Typography>
                <Typography variant="h3" sx={{ display: 'flex', fontWeight: 800 }}>All-in-one</Typography>
                <Typography variant="h5" sx={{ display: 'flex', fontWeight: 400 }}>Computer Science </Typography>
                <Typography variant="h5" sx={{ display: 'flex', fontWeight: 400 }}>Learning Platform</Typography>

                <Button
                    variant='contained'
                    sx={{
                        display: "flex",
                        width: "42%",
                        borderRadius: 2,
                        fontSize: '100%',
                        marginTop: '15%'
                    }}
                    onClick={() => { navigate('/landing/wizard'); }}>
                    <AddIcon />
                    Get Started </Button>
            </Box >

        </Backdrop>


</>
  );
}

import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import BookIcon from '@mui/icons-material/Book';
import ChatIcon from '@mui/icons-material/Chat';
import PersonIcon from '@mui/icons-material/Person';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from "react";
import * as Logger from '../../util/Logger.mjs';
import * as Util from "../../util/Util.mjs";
import { useNavigate } from "react-router-dom";


let visibilityListener;
let pageChangeListener;

export function BottomNavBar() {


  const [pageIndex, setPageIndex] = useState(0);
  const [isVisible, setVisibility] = useState(true);
  const nav = useNavigate();

  const tabMapping = [
    "home",
    "subjects/list",
    //"courses/detail/0",
    "profile/self"
  ];

  useEffect(() => {

    //This is in place because of ReactJS's debugging mechanism (shadow-dom?)
    visibilityListener ??= (isVisible) => {
      Logger.verbose(`New nav bar visibility: ${isVisible}`);
      setVisibility(isVisible);
    };

    pageChangeListener ??= (newPageIndex) => {
        Logger.verbose(`Page Change triggered ${newPageIndex}`);

        setPageIndex(newPageIndex);
    };

    Util.addCallback("onNavBarShow", visibilityListener);
    Util.addCallback("setNewPage", pageChangeListener);


  }, []);


  return (
    <Box sx={{ pb: 7 }}>
      <CssBaseline />

      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>

        <BottomNavigation
          showLabels
          value={pageIndex}
          
          sx={{
            display: isVisible ? 'block' : 'none',
            marginY: 1,
            bgcolor: 'background.paper',
            paddingTop:'1.3vh'
          }
          }
          onChange={async (event, newPageIndex) => {

            //Ignore user spamming
            if (newPageIndex === pageIndex) {
              return;
            }

            setPageIndex(newPageIndex);

            nav(tabMapping[newPageIndex]);

            //TODO: Add listeners in routers that responds to this event
            await Util.invokeCallback("onPageIndexChanged", newPageIndex);
          }
          }
        >
          <BottomNavigationAction disableRipple label="Home" icon={<HomeIcon/>} />
          <BottomNavigationAction disableRipple label="Subjects" icon={<BookIcon />} />
          {/*<BottomNavigationAction disableRipple label="Social" icon={<ChatIcon />} />*/}
          <BottomNavigationAction disableRipple label="Me" icon={<PersonIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
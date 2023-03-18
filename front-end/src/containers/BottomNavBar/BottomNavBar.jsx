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
import {useState} from "react";
import * as Util from "../../util/Util.mjs";



export function BottomNavBar() {

  const [pageIndex, setPageIndex] = useState(0);

  return (
    <Box sx={{ pb: 7 }}>
      <CssBaseline />

      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, paddingBottom: 0.5 }} elevation={3}>

       <BottomNavigation
          showLabels
          value={pageIndex}
          onChange={async (event, newPageIndex) => {

                //Ignore user spamming
                if(newPageIndex === pageIndex) {
                    return;
                }

                setPageIndex(newPageIndex);

                //TODO: Add listeners in routers that responds to this event
                await Util.invokeCallback("onPageIndexChanged",newPageIndex);
            }
          }
        >
          <BottomNavigationAction label="Home" icon={<HomeIcon />} />
          <BottomNavigationAction label="Subjects" icon={<BookIcon />} />
          <BottomNavigationAction label="Social" icon={<ChatIcon />} />
          <BottomNavigationAction label="Me" icon={<PersonIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
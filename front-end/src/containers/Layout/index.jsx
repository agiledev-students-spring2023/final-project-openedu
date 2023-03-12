import React from 'react';
import { Box } from '@mui/material';
import BottomNavBar from '../BottomNavBar';


// eslint-disable-next-line react/prop-types
const Layout = ({children}) => (
  <>
    <Box>
        {children}
        <BottomNavBar/>
    </Box>
  </>
);

export default Layout;

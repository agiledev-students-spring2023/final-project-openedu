import React from 'react';
import { Box } from '@mui/material';
import {BottomNavBar} from '../BottomNavBar/BottomNavBar';


// eslint-disable-next-line react/prop-types
export const Layout = ({children}) => (
  <>
    <Box>
        {children}
        <BottomNavBar/>
    </Box>
  </>
);
import React from 'react'
import { Box } from '@mui/material'
import BottomNavBar from '../BottomNavBar'

export default function Layout({ children }) {
    return (
        <div>

            <Box >
                {children}
                <BottomNavBar/>
            </Box>
        </div>
    )
}



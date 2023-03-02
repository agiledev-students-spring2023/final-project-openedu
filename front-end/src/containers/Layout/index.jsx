import React from 'react'
import { Box } from '@mui/material'

export default function Layout({ children }) {
    return (
        <div>

            <Box >
                {children}
            </Box>
        </div>
    )
}



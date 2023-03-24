import React from 'react'
import { Box, CircularProgress } from '@mui/material'
export default function Loading() {
    return (
        <Box sx={{
            position: 'absolute',
            width: 1,
            left: 0,
            height: 1,
            top: 0,
            zIndex: 100,
        }}>
            <Box sx={{
                position: 'absolute',
                width: 1,
                left: 0,
                height: 1,
                top: 0,
                backgroundColor: 'white',
                opacity: 0.8,
            }} />
            <CircularProgress size="4rem" sx={{
                marginTop: '80%',
            }} />
        </Box>
    )
}

import React from 'react'
import { Box, Paper, Typography } from '@mui/material'
export default function CourseCard(props) {
    const { title, completeness } = props.title ? props : { title: "Java", completeness: 0 }

    const cardSize = 106
    return (
        <Paper
            variant='outlined'
            sx={{
                width: cardSize,
                height: cardSize,
                backgroundColor: '#F5F5F5',
                borderRadius: '20px',
                barder: '1px solid #E0E0E0',
            }}
            square
        >
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: '50%',
                marginLeft: '10%',
            }}>
                <Typography
                    variant="h6"
                    sx={{
                        display: 'flex',
                        fontSize: '16px'
                    }}>
                    {title}
                </Typography>
                <Typography
                    sx={{
                        display: 'flex',
                        fontSize: '8px'
                    }}>
                    {completeness}
                </Typography>
            </Box>
        </Paper>
    )
}

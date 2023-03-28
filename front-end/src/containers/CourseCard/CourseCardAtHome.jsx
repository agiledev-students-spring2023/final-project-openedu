import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { mockImageApi } from '../../mockApi/apis.mjs';
export default function CourseCardAtHome(props) {
    const { title, completeness } = props.title ? props : { title: "Title", completeness: 0 };

    const cardSize = 106;
    return (
        <Paper
            variant='outlined'
            sx={{
                width: cardSize,
                height: cardSize,
                backgroundColor: '#F5F5F5',
                borderRadius: '20px',
                barder: '1px solid #E0E0E0',
                backgroundImage: `url(${mockImageApi(200, 200)})`,
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
    );
}

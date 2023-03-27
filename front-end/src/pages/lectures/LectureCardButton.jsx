import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Card, ButtonBase, Grid, Typography, CardMedia, CardContent, Box } from '@mui/material'

export default function ClassCardButtonGrid(props) {
    const { title, thumbnails, resourceId, courseId, lecNum } =
        props.title ? props : {
            title: "Casting in C++", thumbnails: { maxres: { url: "https://i.ytimg.com/vi/1E_kBSka_ec/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDeCwHu9bvvBldHxXZbzNEkMxfCVQ" } },
            courseId: "12", lecNum: "12"
        };
    const navigate = useNavigate();

    // Always use the highest resolution thumbnail
    const tbnArrResolution = ['maxres', 'standard', 'high', 'medium', 'default'];
    let thumbnailUrl = '';
    for (let i = 0; i < tbnArrResolution.length; i++) {
        if (thumbnails[tbnArrResolution[i]]) { thumbnailUrl = thumbnails[tbnArrResolution[i]].url; }
        break;
    }

    return (
        <Box sx={{ width: 1 }}>
            <ButtonBase sx={{ width: '100%', marginBottom: '0.5vh' }}
                onClick={() => navigate(`/course/${courseId}/lecture/${lecNum}`)}>
                <Card sx={{
                    display: 'flex',
                    width: '100%',
                }}>
                    <CardMedia
                        component="img"
                        sx={{
                            width: '34%',
                            display: 'block',
                            marginLeft: '0.5vh',
                            borderRadius: '5px',
                            marginTop: '0.5vh',
                            marginBottom: '0.5vh',
                        }}
                        image={`https://i.ytimg.com/vi/1E_kBSka_ec/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDeCwHu9bvvBldHxXZbzNEkMxfCVQ`}
                        alt={title}
                    />

                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <CardContent sx={{
                            marginLeft: '-0.5vh',
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            <Typography variant='h7' sx={{ display: 'flex', fontSize: '17px' }}>
                                {title}
                            </Typography>
                            <Typography variant='h9' sx={{
                                position: 'relative',
                                top: '45%',
                                display: 'flex', fontSize: '7px'
                            }}>
                                Length
                            </Typography>
                        </CardContent>
                    </Box>
                </Card>
            </ButtonBase>
        </Box>
    )
}

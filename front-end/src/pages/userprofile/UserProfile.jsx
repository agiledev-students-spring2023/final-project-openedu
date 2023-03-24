import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Add, Logout, Create, Remove } from '@mui/icons-material';
import StyledAvater from '../../containers/StyledAvatar';
import { mockImageApi } from '../../mockApi/apis.mjs';
import { useNavigate } from 'react-router-dom';
import PostCard from '../../containers/PostCard/PostCard';
import ComposePost from '../posts/ComposePost';
import { compose } from '@mui/system';
import MDEditor from '@uiw/react-md-editor';
export default function UserProfile() {
    const navigate = useNavigate();
    const [composeMode, setComposeMode] = useState(false);
    return (
        <Box>
            <Box sx={{
                marginTop: '3vh',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <Button
                    variant='contained'
                    sx={{
                        width: "35%",
                        display: 'flex'
                    }}
                    onClick={() => { setComposeMode(1); }}>
                    <Add />
                    Compose </Button>
                <Button
                    variant='contained'
                    color="error"
                    sx={{
                        width: "35%",
                        display: 'flex'
                    }}
                    onClick={() => { navigate("/landing/greeting"); }}>
                    <Logout />
                    Logout </Button>

            </Box>

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '2vh'
            }}>
                <StyledAvater
                    size='72px'
                    alt="Hooao"
                    src={mockImageApi(72)}
                    sx={{
                        display: 'flex'
                    }} />

                <Typography
                    variant='h4'
                    sx={{ fontWeight: "700", }}>Hooao</Typography>

                <Typography
                    variant='h9'
                    sx={{ fontWeight: "500", }}>Description..</Typography>
                <Button
                    variant='contained'
                    sx={{
                        width: "100%",
                        display: 'flex',
                        marginTop: '1vh'
                    }}
                    onClick={() => { navigate('/profile/edit'); }}>
                    <Create sx={{ marginRight: '10px' }} />
                    Edit Profile </Button>
            </Box>


            <Box className="postSection"
                sx={{
                    display: composeMode ? "none" : "flex",
                    flexDirection: 'column',
                }}>
                {[1, 2, 3].map((e, i) => {
                    return (<PostCard sx={{ display: 'flex', width: '100%' }} key={i} />);
                })}

                <Typography sx={{ marginTop: '9%' }}>4 {`Post(s)`} in Total</Typography>
            </Box>

            <Box sx={{
                marginTop: '2vh',
                display: composeMode ? "block" : "none"
            }}>
                <ComposePost />

                <Button
                    variant='contained'
                    sx={{
                        width: "35%",
                        marginTop: '2vh'
                    }}
                    onClick={() => { setComposeMode(0); }}>
                    <Add />
                    Submit </Button>
                <Button
                    variant='contained'
                    color='error'
                    sx={{
                        width: "35%",
                        marginTop: '2vh',
                        marginLeft: '2%'
                    }}
                    onClick={() => { setComposeMode(0); }}>
                    <Remove />
                    Discard </Button>
            </Box>
        </Box>
    );
}

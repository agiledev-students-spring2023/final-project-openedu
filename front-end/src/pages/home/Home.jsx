import { Box, Typography } from "@mui/material";
import { CreateOutlined, Restore, Favorite } from "@mui/icons-material";
import React, { useEffect } from "react";
import BackgroundImage from "../../containers/BackgroundImage";
import { useNavigate } from "react-router-dom";

export function Home(props) {
    const navigate = useNavigate()
    return (
        <Box>
            {/* <BackgroundImage /> */}

            <Box>
                <Box
                    className="welcome_line"
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: '22vh',
                        marginBottom: '6vh'
                    }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginLeft: '5%'
                    }}>
                        <Typography
                            variant='h5'
                            sx={{
                                fontFamily: 'Raleway',
                                display: 'flex'
                            }}>
                            Welcome,
                        </Typography>
                        <Typography variant='h3' sx={{
                            fontWeight: "900",
                            display: 'flex'
                        }}>
                            Hoooao!
                        </Typography>
                    </Box>
                    <CreateOutlined sx={{
                        display: 'flex',
                        marginRight: '5%'
                    }}
                        onClick={() => { navigate("/profile/edit") }} />
                </Box>
            </Box>

            <Box className="tabs" sx={{
                borderRadius: '24px',
                backgroundColor: 'green',
                position: 'absolute',
                left: '0',
                width: '1',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Box className="recent"
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: '3vh',
                        marginLeft: '4vh'
                    }}>
                    <Restore sx={{
                        display: 'flex',
                        fontSize: "35px",
                        marginRight: '9px'
                    }} />
                    <Typography
                        variant="h5"
                        sx={{ display: 'flex' }}>
                        Recents
                    </Typography>

                </Box>

                <Box className="guess_you_like"
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: '3vh',
                        marginLeft: '4vh'
                    }}>
                    <Favorite sx={{
                        display: 'flex',
                        fontSize: "35px",
                        marginRight: '9px'
                    }} />
                    <Typography
                        variant="h5"
                        sx={{ display: 'flex' }}>
                        You May Like
                    </Typography>

                </Box>
            </Box>
        </Box>
    );

}
import { Box, Typography, Button } from "@mui/material";
import { CreateOutlined, Restore, Favorite } from "@mui/icons-material";
import React, { useEffect } from "react";
import BackgroundImage from "../../containers/BackgroundImage";
import { useNavigate } from "react-router-dom";
import CourseCard from "../../containers/CourseCard/CourseCardAtHome";

const CourseSlide = (props) => {
    return (
        <Box sx={{
            marginTop: '5%',
            marginLeft: '2.3vh',
            display: 'flex',
            justifyContent: 'space-between',
            marginRight: '2.3vh'
        }}>
            <CourseCard />
            <CourseCard />
            <CourseCard />
        </Box>

    );
};


export function Home(props) {
    const navigate = useNavigate();
    return (
        <Box>
            <BackgroundImage />
            <Box>
                <Box
                    className="welcome_line"
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: 1,
                        alignItems: 'center',
                        marginTop: '20vh',
                        marginBottom: '6vh'
                    }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginLeft: '5%',
                    }}>
                        <Typography
                            variant='h5'
                            sx={{
                                fontFamily: 'Raleway',
                                display: 'flex',
                                fontSize: '30px'
                            }}>
                            Welcome,
                        </Typography>
                        <Typography variant='h3' sx={{
                            fontWeight: "900",
                            display: 'flex',
                            fontSize: '45px'
                        }}>
                            Hoooao!
                        </Typography>
                    </Box>
                    <Button onClick={() => { navigate("/profile/edit"); }}>
                        <CreateOutlined sx={{
                            display: 'flex',
                            marginRight: '5%',
                            color: 'text.primary'
                        }}
                        />
                    </Button>
                </Box>
            </Box>

            <Box className="tabs" sx={{
                borderRadius: '24px',
                backgroundColor: 'background.default',
                position: 'absolute',
                left: '0',
                width: '1',
                display: 'flex',
                flexDirection: 'column',
                paddingBottom: '10vh'
            }}>
                <Box className="recent"
                    color="primary"
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: '3vh',
                        marginLeft: '2.3vh',
                    }}>
                    <Restore
                        color="primary"
                        sx={{
                            display: 'flex',
                            fontSize: '25px',
                            marginRight: '9px'
                        }} />
                    <Typography
                        variant="h5"
                        sx={{ display: 'flex', fontSize: '20px' }}>
                        Recents
                    </Typography>
                </Box>

                <CourseSlide className="courseCards" />

                <Box className="guess_you_like"
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: '3vh',
                        marginLeft: '2.3vh',
                    }}>
                    <Favorite
                        color="primary"
                        sx={{
                            display: 'flex',
                            fontSize: '22px',
                            marginRight: '9px'
                        }} />
                    <Typography
                        variant="h5"
                        sx={{ display: 'flex', fontSize: '20px' }}>
                        You May Like
                    </Typography>

                </Box>
                <CourseSlide className="courseCards" sx={{ marginBottom: '30px' }} />
            </Box>

        </Box>
    );

}
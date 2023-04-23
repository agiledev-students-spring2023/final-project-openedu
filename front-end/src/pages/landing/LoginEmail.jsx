import React from "react";
import {BackButton} from "../../containers/BackButton/BackButton";
import {useNavigate} from "react-router-dom";
import {Box, Typography} from "@mui/material";
import BackgroundImage from "../../containers/BackgroundImage";

export function LoginEmail(props) {

    const navigate = useNavigate();
    return (<>

        {/*Background Layer*/}
        <BackgroundImage/>

        {/*Foreground Layer*/}
        <Box>
            <BackButton/>


            {/*Centered Container*/}
            <Box
                sx={{
                    marginTop: '20vh',
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Box sx={{
                    marginTop: '20vh',
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",

                }}>

                    <Typography
                        sx={{
                            fontWeight: "700",
                            fontSize: "60px",
                            lineHeight: "70px",
                            textShadow: "0px 3px 2px rgba(200, 200, 200)",
                        }}
                        variant="h1"
                    >
                        Welcome!
                    </Typography>
                </Box>

                <Box
                    sx={{marginTop: '2%'}}>
                    <Typography sx={{
                        fontFamily: "Inter",
                        fontWeight: "500",
                        fontSize: "16px",
                        textShadow: "0px 1px 1px rgba(200, 200, 200)"
                    }}>
                        Let&apos;s start with your email
                    </Typography>
                </Box>

            </Box>

        </Box>


    </>);

}
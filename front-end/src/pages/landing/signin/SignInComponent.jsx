import React from 'react';
import {Typography, Box, TextField, Button} from '@mui/material';

// eslint-disable-next-line
export const SignInComponent = props => {
    return (
        <div>
            <Button
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "0px",
                    gap: "8px",

                    position: "absolute",
                    width: "83px",
                    height: "40px",
                    left: "360px",
                    top: "29px",

                    background: "#FFFFFF",
                    border: "2px solid #000000",
                    variant: "text",
                    color: "#000000",
                }}
            >
                Back
            </Button>

            <Button
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "0px",
                    gap: "8px",

                    position: "absolute",
                    width: "123px",
                    height: "40px",
                    left: "690px",
                    top: "550px",

                    background: "#FFFFFF",
                    border: "2px solid #000000",
                    variant: "text",
                    color: "#000000",
                }}
            >
                Continue
            </Button>

            <Box sx={{
                height: {xs: 350, md: 200, lg: 450},
            }}>

                <Typography sx={{
                    paddingTop: '120px',
                    fontSize: {xs: '30px', md: '50px', lg: '80px'},
                    fontWeight: 'bold',
                    color: 'Black'
                }}>
                    Password
                </Typography>

                <Typography sx={{
                    paddingTop: '60px',
                    fontSize: {xs: '30px', md: '50px', lg: '30px'},
                    fontWeight: 'bold',
                    color: 'Black'
                }}>
                    Welcome Back, <br/>
                    Hooao!
                </Typography>

            </Box>
            <section className="main-content">
                <TextField
                    id="filled-basic"
                    type="password"
                    label="Password"
                    variant="filled"
                    placeholder="********"
                    sx={{width: "349px", height: "56px"}}/>
            </section>
        </div>

    );
};

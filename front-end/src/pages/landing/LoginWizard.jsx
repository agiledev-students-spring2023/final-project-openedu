import React, {createContext, useContext, useState} from 'react';
import {Box, Button, InputAdornment, TextField, Typography} from '@mui/material';
import BackgroundImage from "../../containers/BackgroundImage/index.jsx";
import {Add, ChevronRight, HighlightOff} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import * as Util from "../../util/Util.mjs";
import {BackButton} from "../../containers/BackButton/BackButton";

// Use Context to make globals,or functions between parent/child
export const LandingContext = createContext(null);

function InputField(props) {
    const [input, setInput] = useState("");
    const handleCleanInput = (e) => {
        e.preventDefault();
        setInput("");
    };
    return (
        <Box>
            <Box sx={{
                marginTop: '11%',
            }}>
                <TextField
                    label={props.label}
                    variant="filled"
                    value={input}
                    sx={{
                        width: "100%",
                        backgroundColor: '#e6e0eb',
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Button
                                    disableRipple
                                    variant="plain"
                                    sx={{ width: '1px' }}
                                    onClick={handleCleanInput}>
                                    <HighlightOff />
                                </Button>
                            </InputAdornment>
                        ),
                    }}
                    onChange={(e) => { setInput(e.target.value); }}
                />
            </Box>
        </Box>

    );
}

// LandingUI is used for three pages: Begin, Signin, Signup
const LandingUi = () => {
    const { landing, setLanding } = useContext(LandingContext);
    const navigate = useNavigate();
    let page = {
        header: 'Begin',
        subheader: `Let's start with your email`,
        input: 'Email',
        next: 1
    };
    //0:begin; 1:signin; 2:signup
    switch (landing) {
        case 0:
            page = {
                header: 'Begin',
                subheader: `Let's start with your email`,
                input: 'Email',
                next: 1
            };
            break;
        case 1:
            page = {
                header: 'Password',
                subheader: `Welcome Back!`,
                input: 'Password',
                next: 0
            };
            break;
        case 2:
            page = {
                header: 'Password',
                subheader: ` At least 8 characters, 
                one uppercase letter, 
                one special character`,
                input: 'Password',
                next: -1
            };
            break;
    }
    const handleContinue = async (e) => {
        e.preventDefault();

        if (page.next===1) { setLanding(1); }
        else {
            Util.invokeCallback("onNavBarShow",true);
            //Util.invokeCallback("onBackEnable",true);
            navigate('/home');
        }
    };

    const handleForget = (e) => {
        e.preventDefault();
        setLanding(2);
    };

    const handleSignup = (e) => {
        e.preventDefault();
        setLanding(2);
    };

    return (
        <>
            <BackButton/>

            <Box sx={{
                marginTop: 10,
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>

                <Typography
                    sx={{
                        fontFamily: "Raleway",
                        fontWeight: "700",
                        fontSize: "60px",
                        lineHeight: "70px",
                        textShadow: "0px 3px 2px rgba(200, 200, 200)",
                    }}
                    variant="h1"
                >
                    {page.header}
                </Typography>
            </Box>

            <Box
                sx={{ marginTop: '2%' }}>
                <Typography sx={{
                    fontFamily: "Inter",
                    fontWeight: "500",
                    fontSize: "16px",
                    textShadow: "0px 1px 1px rgba(200, 200, 200)"
                }}>
                    {page.subheader}
                </Typography>
            </Box>
            <InputField label={page.input} />

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Button
                    variant='contained'
                    sx={{
                        marginTop: '11%',
                        width: "35%",
                        fontSize: '100%',
                        display: 'flex'
                    }}
                    onClick={handleContinue}>
                    Continue <ChevronRight />
                     </Button>

                {/*<Button*/}
                {/*    variant='contained'*/}
                {/*    sx={{*/}
                {/*        marginTop: '3%',*/}
                {/*        width: "35%",*/}
                {/*        fontSize: '100%',*/}
                {/*        display: page.next === 0 ? "flex" : "none"*/}
                {/*    }}*/}
                {/*    onClick={handleForget}>*/}
                {/*    <Add />*/}
                {/*    Forget Password</Button>*/}

                {/*<Button*/}
                {/*    variant='contained'*/}
                {/*    sx={{*/}
                {/*        marginTop: '3%',*/}
                {/*        width: "35%",*/}
                {/*        fontSize: '100%',*/}
                {/*        display: page.next === 0 ? "flex" : "none"*/}
                {/*    }}*/}
                {/*    onClick={handleSignup}>*/}
                {/*    <Add />*/}
                {/*    Sign Up </Button>*/}
            </Box >
        </>
    );
};


export default function LoginWizard() {
    // 0: begin; 1: login; 2: signup
    const [landing, setLanding] = useState(0);

    return Util.asChildPage(
        <LandingContext.Provider value={{ landing, setLanding }}>
            <Box>
                <BackgroundImage />
                <LandingUi />
            </Box>
        </LandingContext.Provider>

    );
}

import React, {createContext, useContext, useEffect, useState} from 'react';
import {Backdrop, Box, Button, InputAdornment, TextField, Typography} from '@mui/material';
import BackgroundImage from "../../containers/BackgroundImage/index.jsx";
import {Add, ChevronRight, HighlightOff} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import * as Util from "../../util/Util.mjs";
import {BackButton} from "../../containers/BackButton/BackButton";
import axios from "axios";
import {getServerAddr} from "../../util/Util.mjs";
import * as Logger from "../../util/Logger.mjs";

// Use Context to make globals,or functions between parent/child
export const LandingContext = createContext(null);

let userInput = "",
    userEmail = "";

function InputField(props) {
    const [input, setInput] = useState("");

    let onClearInput;

    
    useEffect(() => {

        onClearInput ??= () => {
            setInput("");
            userInput = "";
        };

        Util.addCallback("onClearLoginInput",onClearInput);

    },[]);

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
                    onChange={(e) => {
                        setInput(e.target.value);
                        //Logger.info(`New Input: ${e.target.value}`);
                        userInput = e.target.value;
                    }}
                />
            </Box>
        </Box>

    );
}

// LandingUI is applied to three pages: Begin, Signin, Signup
const LandingUi = () => {

    const { landing, setLanding } = useContext(LandingContext);
    const navigate = useNavigate();
    const {inputValue, setInputValue} = useState("");


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

        //Next page is password page
        if (page.next === 1) {

            const res = await axios.get(Util.getServerAddr() + "/login/info",{params: {"email" : userInput}});
            Logger.verbose(`/login/info comes back with: ${JSON.stringify(res.data)}`);

            userEmail = userInput;

            await Util.invokeCallback("onClearLoginInput");
            //If status = 1, then the user does not exist and we shall proceed to create a new account, otherwise enter password
            setLanding(res.data["status"] === 1 ? 2 : 1);

        }
        else {
            const res = await axios.post(Util.getServerAddr() + "/login/validate",{"email":userEmail, "pwd": userInput});
            Logger.verbose(`/login/validate comes back with: ${JSON.stringify(res.data)}`);

            //Auth Successful
            if(res.data["status"] === 0) {

                //Write everything we received from server to localStorage
                for(const prop in Object.keys(res.data["content"])) {
                    Util.writeLocalValue(prop, res.data["content"][prop]).then(_ => true);
                }

                Util.invokeCallback("onNavBarShow", true).then(() => true);
                navigate('/home');
            }
            else {
                await Util.invokeCallback("onClearLoginInput");
                await Util.invokeCallback("onShowSnackBar","error",`Login Failed!, reason: ${res.data["content"]}`);
            }

        }
    };


    return (
        <>
            <BackButton/>

            <Box sx={{
                marginTop: '20vh',
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                
            }}>

                <Typography
                    sx={{
                        //fontFamily: "Raleway",
                        fontWeight: "700",
                        fontSize: "60px",
                        lineHeight: "70px",
                        textShadow: "0px 3px 2px rgba(200, 200, 200)",
                        "z-index" : 2000
                    }}
                    variant="h1"
                >
                    {page.header}
                </Typography>

                <Typography sx={{
                    marginTop: "10px",
                    fontWeight: "500",
                    fontSize: "16px",
                    textShadow: "0px 1px 1px rgba(200, 200, 200)",
                    "z-index" : 2000
                }}>
                    {page.subheader}
                </Typography>
            </Box>


            <InputField label={page.input}/>

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
                <BackgroundImage/>

                <Backdrop open sx={{
                    "z-index" : 0,
                }}/>

                <Backdrop open={landing > 0} sx={{
                    color: "#fff",
                    "z-index" : 0,
                    backdropFilter:  "blur(100px)"
                }}/>


                <LandingUi/>
            </Box>
        </LandingContext.Provider>

    );
}

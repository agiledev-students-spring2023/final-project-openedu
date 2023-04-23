import React, {useEffect, useState} from 'react';
import {Alert, Box, Container, Snackbar} from '@mui/material';
import { BottomNavBar } from '../BottomNavBar/BottomNavBar';
import * as Util from "../../util/Util.mjs";
import * as Logger from "../../util/Logger.mjs";

// eslint-disable-next-line react/prop-types
export const Layout = ({ children }) => {

    const [isSnackBarVisible,setSnackbarVisibility] = useState(false);
    const [severity, setSeverity] = useState("error");
    const [snackbarMessage, setSnackbarMessage] = useState("");

    let onShowSnackBar;

    useEffect(() => {

        onShowSnackBar ??= (type, message) => {

            type = new Set(["error","warning","info","success"]).has(type) ? type : "info";

            Logger.info("New Severity: " + type);
            setSeverity(type);

            setSnackbarMessage(message ?? "");
            setSnackbarVisibility(true);
        };

        Util.addCallback("onShowSnackBar",onShowSnackBar);

    },[]);

    const handleClose = () => setSnackbarVisibility(false);

    return (
        <>
            <Box sx={{marginTop:'4vh'}}>

                <Container sx={{ width: "100%", }}>
                    {children}
                </Container>

                <Snackbar
                    //severity={severity}
                    open={isSnackBarVisible}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    anchorOrigin={{"vertical": "bottom", "horizontal": "center"}}
                    sx={{
                        marginBottom: "80px"
                    }}
                >
                    <Alert severity={severity} sx={{
                        "width" :"100%"
                    }}>{snackbarMessage}</Alert>
                </Snackbar>

                {/* This is for Horizontal screen */}
                <Box sx={{ marginBottom: '10%' }}></Box>
                <BottomNavBar />
            </Box>
        </>
    );
};
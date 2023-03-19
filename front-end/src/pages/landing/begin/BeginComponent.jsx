import React, { useState } from "react";
import { Typography, Box, TextField, Button, InputAdornment } from "@mui/material";
import { HighlightOff, Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
function EmailField() {
        const [email, setEmail] = useState("");
        const navigate = useNavigate()
        const handleCleanEmail = (e) => {
                e.preventDefault();
                setEmail("");
        }

        return (
                <Box>
                        <Box sx={{
                                marginTop: '11%'
                        }}>
                                <TextField
                                        label="Email"
                                        variant="filled"
                                        value={email}
                                        placeholder="Please Enter Your Email"
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
                                                                        onClick={handleCleanEmail}>
                                                                        <HighlightOff />
                                                                </Button>
                                                        </InputAdornment>
                                                ),
                                        }}
                                        onChange={(e) => { setEmail(e.target.value) }}
                                />
                        </Box>

                        <Box>
                                <Button
                                        variant='contained'
                                        sx={{
                                                marginTop: '11%',
                                                width: "35%",
                                                fontSize: '100%',
                                        }}
                                        onClick={() => { navigate('/signin') }}>
                                        <Add />
                                        Continue </Button>
                        </Box >
                </Box>

        );
}

export const BeginComponent = (props) => {
        return (
                <div className="BeginComponent">
                        <Box sx={{
                                marginTop: '65%'
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
                                        Begin
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
                                        Let&apos;s start with your email
                                </Typography>
                        </Box>
                        <EmailField />
                </div>
        );
};

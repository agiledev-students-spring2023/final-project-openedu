import React, { useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import {
    Box, TextField, Typography, Grid, Button, Container,
} from '@mui/material';
import StyledAvater from '../../../containers/StyledAvatar';
import { Upload, Event, Save, HighlightOff } from '@mui/icons-material/';
import axios from 'axios';
import { mockImageApi } from '../../../mockApi/apis.mjs';



export default function UserProfile(props) {
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [avatar, setavatar] = useState('');
    const [id, setid] = useState('');
    const [description, setdescription] = useState('');
    const [userObj, setUserObj] = useState({})
    const baseURL = "apiConfig.base";
    const navigate = useNavigate();

    //   useEffect(() => {
    //     axios({
    //       method: "GET",
    //       url: `${baseURL}/api/user/profile`
    //     }).then(res => {
    //       const user = res.data.userObj || JSON.parse(localStorage.getItem('userObj'));
    //       setUserObj(user)
    //       if (user.id) {
    //         setavatar(user.avatar);
    //         setdescription(user.description);
    //         setemail(user.email);
    //         setname(user.name);
    //         setid(user.id)
    //       }
    //       else {
    //         navigate('/');
    //       }
    //     })
    //   }, [])

    const handleChangeInfo = (e) => {
        e.preventDefault();
        axios({
            method: "POST",
            url: `${baseURL}/api/user/update_profile`,
            data: {
                name,
                description,
                avatar,
                email,
                id
            }
        }).then(res => {
            navigate("/profile")
        })
    }

    const handleLogout = () => {
        axios({
            method: "GET",
            url: `${baseURL}/api/user/logout`,
        }).then(res => {
            navigate('/');
            localStorage.removeItem("userObj")
        })
    }

    return (
        <Container fixed sx={{ marginTop: "10%" }}>
            <Box>
                {/* Avatar */}
                <Box sx={{
                    width: '95%',
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}>

                    <StyledAvater alt="USER NAME !" src={mockImageApi(200)} size="90px" />
                    <Box sx={{
                        display: 'flex',
                        flexDirection: "column",
                        width: "66%",
                        justifyContent: "space-evenly"
                    }}>

                        <Button variant='contained' sx={{
                            display: "flex",
                            width: "100%",
                            borderRadius: 2,
                        }}>
                            <Upload sx={{ marginRight: "7%" }} />
                            Upload Avatar </Button>

                        <Button variant='contained' color='neutral'
                            sx={{
                                display: "flex",
                                width: "100%",
                                borderRadius: 2,
                            }}>
                            <Event sx={{ marginRight: "5%" }} /> Recently Used</Button>
                    </Box>
                </Box>

                {/* Info */}

                <Box sx={{
                    marginTop: '19%',
                    width: "100%",
                }}>
                    <Grid container spacing={3} sx={{ width: "100%" }}>
                        <Grid item sx={{ width: "100%" }}>
                            <TextField
                                id="filled-multiline-flexible"
                                label="Username"
                                value={name}
                                variant="outlined"
                                sx={{ width: "100%" }}
                                onChange={(e) => { setname(e.target.value) }}
                                helperText="Give yourself a shinny callsign!"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                id="outlined-multiline-static"
                                label="Description"
                                multiline
                                value={description}
                                helperText="Let's have a funny quote!"
                                sx={{
                                    width: "100%"
                                }}
                                onChange={(e) => { setdescription(e.target.value) }}
                            />
                        </Grid>
                    </Grid>


                    <Grid container spacing={2} sx={{ width: "100%", marginTop: '20%' }}>
                        <Grid item sx={{ width: "100%" }}>
                            <Button variant='contained' sx={{
                                display: "flex",
                                width: "100%",
                                borderRadius: 2,
                                fontSize: '100%'
                            }}>
                                <Save sx={{ marginRight: "5%" }} />
                                Save Changes </Button>
                        </Grid>

                        <Grid item xs={12}>
                            <Button variant='contained' color="error" sx={{
                                display: "flex",
                                width: "100%",
                                borderRadius: 2,
                                fontSize: '100%'
                            }}>
                                <HighlightOff sx={{ marginRight: "5%" }} />
                                Discard Changes </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}

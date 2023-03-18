import React, { useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import {
    Box, TextField, Typography, Grid, Button, Container,
} from '@mui/material';
import StyledAvater from '../../containers/StyledAvatar';
import { Upload, Event, EventRepeat } from '@mui/icons-material/';
import axios from 'axios';
import { mockImageApi } from '../../mockApi/apis.mjs';



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
        <Container fixed sx={{marginTop:"10%"}}>
            <Box>
                <Box sx={{
                    display: "flex",
                    backgroundColor: "red",
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}>

                    <StyledAvater alt="aa" src={mockImageApi(200)} size="90px" />
                    <Box sx={{
                        display: 'flex',
                        flexDirection: "column",
                        width: "60%",
                        justifyContent: "space-evenly"
                    }}>

                        <Button variant='contained' sx={{
                            display: "flex",
                            width: "100%",
                            borderRadius: 2,
                        }}>
                            <Upload sx={{ marginRight: "7%" }} />
                            Upload Avatar </Button>

                        <Button variant='contained'
                            sx={{
                                display: "flex",
                                width: "100%",
                                borderRadius: 2,
                            }}>
                            <EventRepeat sx={{ marginRight: "5%" }} /> Recently Used</Button>
                    </Box>
                </Box>


                <Box sx={{
                    marginTop: '30px'
                }}>
                    <Typography sx={{
                        marginBottom: '20px'
                    }}>
                        You Can Change Your Profile Here
                    </Typography>
                    <form action="" onSubmit={handleChangeInfo}>
                        <Grid container spacing={3}>

                            <Grid item xs={12}>
                                <TextField
                                    id="filled-multiline-flexible"
                                    label="Username"
                                    multiline
                                    maxRows={4}
                                    value={name}
                                    variant="filled"
                                    onChange={(e) => { setname(e.target.value) }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    id="filled-multiline-flexible"
                                    label="E-mail"
                                    multiline
                                    maxRows={4}
                                    value={email}
                                    variant="filled"
                                    onChange={(e) => { setemail(e.target.value) }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    id="filled-multiline-flexible"
                                    label="Avatar"
                                    multiline
                                    maxRows={4}
                                    value={"Please put the url here"}
                                    variant="filled"
                                    onChange={(e) => { setavatar(e.target.value) }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Description"
                                    multiline
                                    rows={4}
                                    value={description}
                                    sx={{
                                        width: "30%"
                                    }}
                                    onChange={(e) => { setdescription(e.target.value) }}
                                />
                            </Grid>
                        </Grid>
                        <Button variant="outlined" size="large" sx={{ marginTop: "30px" }} type="submit">Submit</Button>
                    </form>
                    <Button variant="outlined" size="large" sx={{ marginTop: "30px" }} onClick={handleLogout}>Logout</Button>
                </Box>
            </Box>
        </Container>
    )
}

import React, { useState, useEffect, useRef } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {
    Box, TextField, InputAdornment, Grid, Button, Container,
} from '@mui/material';
import StyledAvater from '../../../containers/StyledAvatar';
import { Upload, Event, Save, HighlightOff } from '@mui/icons-material/';
import axios from 'axios';
import { mockImageApi, mockDataApi } from '../../../mockApi/apis.mjs';



export default function EditProfile(props) {
    const avatarInputRef = useRef(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState(''); // Email may required?
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [description, setDescription] = useState('');
    const baseURL = "apiConfig.base"; // Backend tbd
    const navigate = useNavigate();

    // Mock!
    // Security needed
    useEffect(() => {
        axios({
            method: "GET",
            url: mockDataApi("comments")
        }).then(res => {
            const user = res.data[0];
            setName(user.user_name);
            setDescription(user.comment);
        }).catch(err => {
            console.log(err);
        });

    }, []);

    const handleCleanUsername = (e) => {
        e.preventDefault();
        setName("");
    };

    const handleSaveChanges = (e) => {
        e.preventDefault();
        // axios({
        //     method: "POST",
        //     url: `${baseURL}/api/user/update_profile`,
        //     data: {
        //         name,
        //         description,
        //     }
        // }).then(res => {
        //     navigate(-1)
        // })
    };

    const handleDiscardChanges = (e) => {
        e.preventDefault();
        navigate("/"); // Or to profile
    };

    const handleSelectAvatar = (e) => {
        e.preventDefault();
        avatarInputRef.current.click();
    };

    const handleAvatarUpload = (e) => {
        e.preventDefault();
        setSelectedAvatar(e.target.files[0]);
        console.log(selectedAvatar);
        const formData = new FormData();
        // More data can be appended, related to user info/security..
        formData.append('file', selectedAvatar);
        // axios.post('/api/upload', formData, {
        //   headers: {
        //     'Content-Type': 'multipart/form-data'
        //   }
        // }).then(response => {
        //   console.log(response.data);
        // }).catch(error => {
        //   console.log(error);
        // });

        console.log(formData); // For testing purposes only
    };



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

                        <div>
                            <input
                                type="file"
                                onChange={handleAvatarUpload}
                                ref={avatarInputRef}
                                style={{ display: 'none' }}
                            />
                            <Button
                                variant='contained'
                                sx={{
                                    display: "flex",
                                    width: "100%",
                                }}
                                onClick={handleSelectAvatar}>
                                <Upload sx={{ marginRight: "7%" }} />
                                Upload Avatar </Button>
                        </div>

                        <Button
                            variant='contained'
                            color='neutral'
                            sx={{
                                display: "flex",
                                width: "100%",  
                            }}
                            onClick={() => navigate("/recently_used_avatars")} >
                            <Event sx={{ marginRight: "5%" }} />
                            Recently Used
                        </Button>
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
                                onChange={(e) => { setName(e.target.value); }}
                                helperText="Give yourself a shinny callsign!"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Button
                                                variant="plain"
                                                sx={{ width: '1px' }}
                                                onClick={handleCleanUsername}>
                                                <HighlightOff />
                                            </Button>
                                        </InputAdornment>
                                    ),
                                }}
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
                                onChange={(e) => { setDescription(e.target.value); }}
                            />
                        </Grid>
                    </Grid>


                    <Grid
                        container
                        spacing={2}
                        sx={{
                            width: "100%",
                            marginTop: '20%',
                            marginBottom: "50%"
                        }}>
                        <Grid item sx={{ width: "100%" }}>
                            <Button
                                variant='contained'
                                sx={{
                                    display: "flex",
                                    width: "100%",
                                    
                                    fontSize: '100%'
                                }}
                                onClick={handleSaveChanges}>
                                <Save sx={{ marginRight: "5%" }} />
                                Save Changes </Button>
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                variant='contained'
                                color="error"
                                sx={{
                                    display: "flex",
                                    width: "100%",
                                    
                                    fontSize: '100%'
                                }}
                                onClick={handleDiscardChanges}>
                                <HighlightOff sx={{ marginRight: "5%" }} />
                                Discard Changes </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

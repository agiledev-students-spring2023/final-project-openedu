import React, { useEffect, useState } from 'react';
import { Avatar, Typography, Box, Button } from '@mui/material';
import { mockImageApi } from '../../mockApi/apis.mjs';
import { useNavigate } from 'react-router-dom';


// Chosen avatar effect is considered
export default function RecentlyUsedAvatars() {
    const [avatars, setAvatars] = useState([]);
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        // axios({
        //     method: "GET",
        //     //url: `${baseURL}/api/user/profile TBD!`
        // }).then(res => {
        //     const user = res.data
        // }).catch(err => {
        //     console.log(err)
        // })
        console.log("RecentlyUsedAvatars Axios TBD");
    }, []);


    // Mocking Avatars
    const tmpAvs = [];
    for (let index = 0; index < 12; index++) {
        tmpAvs.push(mockImageApi(200));
    }

    const handleSaveChanges = () => {
        console.log("RecentlyUsedAvatars/handleSaveChanges Mocked");
        navigate(-1);
        //TODO: Enable this in Sprint 2
        // axios({
        //     method: "POST",
        //     url: `${baseURL}/api/user/update_profile`,
        //     data: {
        //         selectedAvatar
        //     }
        // }).then(res => {
        //     navigate(-1)
        // }).catch(err=>{console.log(err)})
    };

    const handleAvatarClick = (item) => {
        setSelectedAvatar(item);
    };


    return (
        <Box>
            <Typography variant='h3' sx={{ marginTop: '12%' }}>Choose One</Typography>

            <Box sx={{
                marginTop: '15%',
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-evenly',
                marginLeft: '5%',
                marginBottom: '7%',
            }}>
                {tmpAvs.map((ele, id) => {
                    return (
                        <Avatar
                            src={ele}
                            key={id}
                            sx={{
                                width: '80px',
                                height: '80px',
                                display: 'flex',
                                marginRight: '5%',
                                marginBottom: '5%'
                            }}
                            onClick={handleAvatarClick} />
                    );
                })}
            </Box>
            <Button
                variant='contained'
                sx={{
                    position: 'absolute',
                    bottom: '17%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: "75%",
                    borderRadius: 2,
                }}
                onClick={handleSaveChanges}>
                Save Changes </Button>
        </Box>
    );
}

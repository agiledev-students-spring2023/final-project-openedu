import React, { useEffect, useState } from 'react';
import { Avatar, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as Util from "../../util/Util.mjs";


// Chosen avatar effect is considered
export default function RecentlyUsedAvatars() {
    const [avatars, setAvatars] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const navigate = useNavigate();
    // Mocked!!!!
    const tmpAvs = [];

    useEffect(() => {
        axios
            .get(Util.getServerAddr() + `/profile/info`, {
                params: {
                    token: Util.readLocalValue("token") ?? 12345,
                    mock: "false"
                }
            })
            .then((response) => {
                const userInfo = response.data["content"];
                setAvatars(userInfo["avatar"]);
                // Mocking !!
                // for (let index = 0; index < 12; index++) {
                //     tmpAvs.push(avatars);
                // }
                setIsLoaded(true);
            })
            .catch((error) => console.error(error));

    }, []);


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
        <>
            {!isLoaded ? (<Box></Box>) : (<Box>
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
                    {tmpAvs.length > 0 ? tmpAvs.map((ele, id) => {
                        return (
                            <Avatar
                                src={avatars}
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
                    }) : <Box>There is no used pic for your profile!</Box>}
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
            </Box>)}
        </>

    );
}

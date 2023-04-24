import React, { useState, useEffect, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
    Box, TextField, InputAdornment, Grid, Button, Container,
} from '@mui/material';
import StyledAvater from '../../containers/StyledAvatar';
import { Upload, Event, Save, HighlightOff } from '@mui/icons-material/';
import axios from 'axios';
import * as Util from "../../util/Util.mjs";
import * as Logger from "../../util/Logger.mjs";


export default function EditProfile(props) {
    const avatarInputRef = useRef(null);
    const [name, setName] = useState('');
    const [avatarImg, setAvatarImg] = useState('');
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    // Mock!
    // Security needed
    useEffect(() => {
        axios
            .get(Util.getServerAddr() + `/profile/info`,{
                params: {
                    token: Util.readLocalValue("token") ?? 12345,
                    mock: "false"
                }
            })
            .then((response) => {
                const userInfo = response.data["content"];
                setName(userInfo["name"]??"earthling");
                setDescription(userInfo["motto"]??"To be or not 2[b], that is not the question");
                setAvatarImg(userInfo["avatar"]??"https://picsum.photos/1024/1024");
            })
            .catch((error) => Logger.error(error));



    }, []);

  const handleCleanUsername = (e) => {
    e.preventDefault();
    setName("");
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    try {

        await axios.post(Util.getServerAddr() + "/profile/update",
            {
                token: Util.readLocalValue("token") ?? 12345,
                mock: "false",
                name: name,
                motto: description,
            }
        );

        navigate(-1);

    } catch(e) {
        Logger.error("Failed to Edit Profile!");
        Logger.error(e);

        await Util.invokeCallback("onShowSnackBar", "error", `Operation Failed, reason: ${e.message}`);
    }
  };

  const handleDiscardChanges = (e) => {
    e.preventDefault();
    navigate(-1); // Or to profile
  };

  const handleSelectAvatar = (e) => {
    e.preventDefault();
    avatarInputRef.current.click();
  };

  const handleAvatarUpload = (e) => {
    e.preventDefault();
    setSelectedAvatar(e.target.files[0]);
    Logger.info(selectedAvatar);
    const formData = new FormData();
    // More data can be appended, related to user info/security..
    formData.append("file", selectedAvatar);
    // axios.post('/api/upload', formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   }
    // }).then(response => {
    //   console.log(response.data);
    // }).catch(error => {
    //   console.log(error);
    // });

    Logger.info(formData); // For testing purposes only
  };

    return (
        <Box fixed sx={{ marginTop: "100px",width: "100%"}}>


        {/*Avatar*/}

        <Box sx={{
            display: "inline-flex",
            flexDirection: "row",
            alignItems: "center"
            // justifyContent: "space-between"
        }}>
            <StyledAvater src={avatarImg} alt="user_avatar" size="90px" />
        </Box>

        {/* Info */}
        <Box
          sx={{
            marginTop: "30px",
            width: "100%",
          }}
        >
          <Grid container spacing={3} sx={{ width: "100%" }}>
            <Grid item sx={{ width: "100%" }}>

                <TextField
                label="Username"
                value={name}
                variant="outlined"
                sx={{
                  width: "100%",
                  input: { color: "#fff" },
                }}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                helperText="Give yourself a shinny callsign!"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        variant="plain"
                        sx={{color: "text.secondary" }}
                        onClick={handleCleanUsername}
                      >
                        <HighlightOff />
                      </Button>
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  sx: { color: "#fff" },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Description"
                multiline
                variant="outlined"
                value={description}
                helperText="Let's have a funny quote!"
                sx={{
                  width: "100%",
                    input: { color: "#fff" },
                }}
                InputLabelProps={{
                  sx: { color: "#fff" },
                }}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </Grid>
          </Grid>

          <Grid
            container
            spacing={2}
            sx={{
              width: "100%",
              marginTop: "30px",
            }}
          >
            <Grid item sx={{ width: "100%" }}>
              <Button
                variant="contained"
                sx={{
                  display: "flex",
                  width: "100%",
                  paddingY: "10px",
                  fontSize: "100%",
                }}
                onClick={handleSaveChanges}
              >
                <Save sx={{ marginRight: "5%" }} />
                Save Changes{" "}
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="error"
                sx={{
                  display: "flex",
                  width: "100%",
                    paddingY: "10px",
                  fontSize: "100%",
                }}
                onClick={handleDiscardChanges}
              >
                <HighlightOff sx={{ marginRight: "5%" }} />
                Discard Changes{" "}
              </Button>
            </Grid>
          </Grid>
        </Box>
    </Box>
  );
}

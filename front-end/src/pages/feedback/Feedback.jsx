import { React, useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Box,Typography,FormGroup,Checkbox,FormControlLabel} from "@mui/material";
import { useParams } from "react-router-dom";
import { BackButton } from "../../containers/BackButton/BackButton";
import Loading from "../../containers/Loading/Loading";
import * as Util from "../../util/Util.mjs";
import * as Logger from "../../util/Logger.mjs";
import axios from "axios";
import { Navigate, useNavigate } from 'react-router-dom';
import {
    TextField, InputAdornment, Grid, Button, Container,
} from '@mui/material';
import { Add, Logout, Create, Remove } from '@mui/icons-material';
import StyledAvater from '../../containers/StyledAvatar';
import { mockImageApi } from '../../mockApi/apis.mjs';
import FeedbackCard from '../../containers/FeedbackCard/FeedbackCard';
import ComposePost from '../posts/ComposePost';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Suggestion() {
    const navigate = useNavigate();
    const [composeMode, setComposeMode] = useState(false);
    const [input, setInput] = useState("");
    const handleCleanInput = (e) => {
        e.preventDefault();
        setInput("");
    };

    
    return (
        <Box>
            <Box sx={{
                marginTop: '3vh',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <Button
                    variant='contained'
                    color="primary"
                    sx={{
                        width: "35%",
                        display: 'flex',

                    }}
                    onClick={() => { setComposeMode(1); }}>
                    <Add />
                    Add New Feedback </Button>
                <Button
                    variant='contained'
                    color="error"
                    sx={{
                        width: "35%",
                        display: 'flex'
                    }}
                    onClick={() => { navigate("/profile/self"); }}>
                    
                    Back </Button>

            </Box>

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '2vh'
            }}>
                <StyledAvater
                    size='72px'
                    alt="Hooao"
                    src={mockImageApi(72)}
                    sx={{
                        display: 'flex'
                    }} />

                <Typography
                    variant='h4'
                    sx={{ fontWeight: "700", }}>Hooao </Typography>

                <Typography
                    variant='h9'
                    sx={{ fontWeight: "500", }}>Feedback</Typography>
                
                <Typography
                    variant='contained'
                    sx={{
                        width: "100%",
                        display: 'flex',
                        marginTop: '1vh',
                        color: 'text.secondary'
                    }}
                >
                    
                <Create sx={{ marginRight: '10px' }} />
                    Your Feedback: </Typography>
            </Box>

            


            <Box className="postSection"
                
                sx={{
                    display: composeMode ? "none" : "flex",
                    flexDirection: 'column',
                }}>
                {[1, 2, 3, 4].map((e, i) => { //TODO: replace with real data from backend
                    return (<FeedbackCard sx={{ display: 'flex', width: '100%' }} key={i} />);
                })}

                <Typography sx={{ marginTop: '9%' }}>4 {`Feedback`} in Total</Typography>
            </Box>

            <Box sx={{
                marginTop: '2vh',
                display: composeMode ? "block" : "none"
                
            }}>
                <FormGroup>
                 <FormGroup 
                 sx={{color: 'red'}}
                 ControlLabel control={<Checkbox defaultChecked />} label="Label" />
                <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
                </FormGroup>

                <TextField id="outlined-basic" label="Subject" variant="outlined" /><br/>

                <br/>
                <TextField id="filled-basic" label="Course" variant="filled" /><br/>

                <br/>
                <TextField id="standard-basic" label="Feedback" variant="standard" multiline maxRows={4}/><br/>

                <br/>

                <Button
                    variant='contained'
                    sx={{
                        width: "35%",
                        marginTop: '10vh'
                    }}
                    onClick={() => { setComposeMode(0); }}>
                    <Add />
                    Submit </Button>
                <Button
                    variant='contained'
                    color='error'
                    sx={{
                        width: "35%",
                        marginTop: '10vh',
                        marginLeft: '2%'
                    }}
                    onClick={() => { setComposeMode(0); }}>
                    <Remove />
                    Discard </Button>
            </Box>
        </Box>
    );
}
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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function Suggestion() {
    const navigate = useNavigate();
    const [composeMode, setComposeMode] = useState(false);
    
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
                    onClick={handleClickOpen}>
                    <Add />
                    Add New Feedback </Button>

                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Feedback Form</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                        Please enter your title and content of feedback below. We
                        will read your feedback as soon as possible.
                        </DialogContentText>
                        <br/>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox />} label="feedback to site" />
                            <FormControlLabel control={<Checkbox />} label="feedback to course" />
                            <FormControlLabel control={<Checkbox />} label="feedback to others" />
                        </FormGroup>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Title (Subject/Course/Site)"
                            fullWidth
                            variant="standard"
                        />
                        <br/>
                        
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Feedback"
                            fullWidth
                            multiline
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Submit</Button>
                    </DialogActions>
                </Dialog>

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
        
            <FeedSection composeMode={composeMode} />
        </Box>

    );

    function FeedSection({ composeMode }) {
        //this section is not rendered when composeMode is true
        if (composeMode) return <div></div>;
        const [feed, setFeed] = useState([]);
      
        useEffect(() => {
          axios
            .get(Util.getServerAddr() + `/post/list?token=123`)
            .then((response) => {
              if (Array.isArray(response.data["content"])) {
                setFeed(response.data["content"]);
              } else {
                console.error(
                  "Response data is not an array:",
                  response.data["content"]
                );
                console.error(
                  "Response data is of type",
                  typeof response.data["content"]
                );
              }
            })
            .catch((error) => console.error(error));
        }, []);
      
        return (
          <Box
            className="feedSection"
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {Array.isArray(feed) &&
              feed.map((feed) => (
                <FeedbackCard key={feed.feedId} feedId={feed.feedId} feed={feed} />
              ))}
      
            <Typography sx={{ marginTop: "9%" }}>
              {feed.length} {`Feedback`} in Total
            </Typography>
          </Box>
        );
      }
      
      
}
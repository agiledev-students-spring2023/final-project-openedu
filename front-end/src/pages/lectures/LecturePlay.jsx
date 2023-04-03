import React, { useState } from 'react';
import {
  Box, Paper, Typography, Button,
  Collapse, List, ListItem,
  ButtonGroup
} from '@mui/material';
import { Favorite, PlayArrowRounded } from '@mui/icons-material';
import { mockImageApi } from '../../mockApi/apis.mjs';
import LectureCard from './LectureCardButton.jsx';
import {BackButton} from "../../containers/BackButton/BackButton";

function FoldableButtonList() {
  const [open, setOpen] = useState(false);
  const buttons = [
    { label: 'Button 1' },
    { label: 'Button 2' },
    { label: 'Button 3' },
    { label: 'Button 4' },
    { label: 'Button 5' },
    { label: 'Button 3' },
    { label: 'Button 4' },
    { label: 'Button 5' },
  ];


  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <Box >

        <BackButton/>

      <Button onClick={handleToggle} sx={{ mb: 1 }}>
        {open ? 'Hide' : 'Show more'}
      </Button>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List
          sx={{
            width: '100%',
            position: 'relative',
            overflow: 'auto',
            maxHeight: 300,
            '& ul': { padding: 0 }
          }}
          subheader={<li />}
        >
          {buttons.map((button, index) => (
            <ListItem disablePadding key={index}>
              <LectureCard/>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </Box>
  );
}


const Layer = () => {
  return (
    <Box>
      <Box
        className="prompt"
        sx={{
        }}>
        <Paper
          variant='outlined'
          sx={{
            width: 1,
            height: '200px',
            backgroundColor: '#F5F5F5',
            borderRadius: '20px',
            barder: '1px solid #E0E0E0',
            backgroundImage: `url(${mockImageApi(400, 200)})`,
          }}
        >
        </Paper>

        <Box className="prompt-texts"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: '3vh'
          }}>
          <Typography
            variant='h5'
            sx={{
              display: 'flex',
            }}
          >
            Course Title
          </Typography>
          <Typography
            variant='h11'
            sx={{
              display: 'flex',
            }}
          >
            Introduction, collapse needed
          </Typography>
        </Box>
      </Box>

      <Box
        className="play-buttons">
        <Box sx={{
          marginTop: '3vh',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          <Button
            variant='contained'
            sx={{
              width: "45%",
              display: 'flex'
            }}
            onClick={() => { }}>
            <PlayArrowRounded />
            Play </Button>
          <Button
            variant='contained'
            color="error"
            sx={{
              width: "45%",
              display: 'flex'
            }}
            onClick={() => { }}>
            <Favorite />
            Favorite </Button>

        </Box>
      </Box>
    </Box>
  );
};


const VideoInfo = () => {
  return (
    <Box
      className="info">
      <Box
        className="info-texts"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: '3vh'
        }}>
        <Typography
          variant='h5'
          sx={{
            display: 'flex',
          }}
        >
          Course Title
        </Typography>
        <Typography
          variant='h11'
          sx={{
            display: 'flex',
          }}
        >
          Introduction, collapse needed
        </Typography>
      </Box>
    </Box>
  );
};

const VideoFrame = () => {
  const videoId = "CWglkNBUmD4";
  return (
    <Box >
      <Box
        className="player"
        sx={{ position: 'relative', width: '100%', height: '20vh', pb: '56.25%' }}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title="Video"
          width="100%"
          height="100%"
          allow="autoplay; encrypted-media"
          allowFullScreen
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
      </Box>

      <Box
        className="info">

      </Box>
    </Box>

  );
};


const Sections = () => {
  const [vid, setVid] = useState(true);

  return (
    <Box sx={{
      display:'flex',
      flexDirection:'column',
    }}>
      <ButtonGroup variant='plain' size='large'
        sx={{
          marginTop: '3vh',
          display: 'flex',
        }}>
        <Button onClick={() => { setVid(true); }}>Videos</Button>
        <Button onClick={() => { setVid(false); }}>Comments</Button>
      </ButtonGroup>
      {vid ? <FoldableButtonList sx={{display:'flex'}}/> : <Box />}
    </Box>
  );
};

export default function PlayScreen() {
  //const cardSize = 106;
  return (
    <Box sx={{
      marginTop: '5vh'
    }}>
      <VideoFrame />
      <VideoInfo />
      <Sections />
    </Box>
  );
}

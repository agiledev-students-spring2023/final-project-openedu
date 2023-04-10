import React, { useState, useEffect } from "react";
import {
  Box, Paper, Typography, Button,
  Collapse, List, ListItem,
  ButtonGroup
} from '@mui/material';
import { Favorite, PlayArrowRounded } from '@mui/icons-material';
import LectureCard from './LectureCardButton.jsx';
import { BackButton } from "../../containers/BackButton/BackButton";
import axios from "axios";
import * as Util from "../../util/Util.mjs";
import Loading from "../../containers/Loading/Loading.jsx";
function FoldableButtonList() {
  const [open, setOpen] = useState(false);
  const buttons = [
    { label: "Button 1" },
    { label: "Button 2" },
    { label: "Button 3" },
    { label: "Button 4" },
    { label: "Button 5" },
    { label: "Button 3" },
    { label: "Button 4" },
    { label: "Button 5" },
  ];

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <Box >
      <Button onClick={handleToggle} sx={{ mb: 1 }}>
        {open ? "Hide" : "Show more"}
      </Button>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List
          sx={{
            width: "100%",
            position: "relative",
            overflow: "auto",
            maxHeight: 300,
            "& ul": { padding: 0 },
          }}
          subheader={<li />}
        >
          {/* 
          DB needed here!
          {buttons.map((button, index) => (
            <ListItem disablePadding key={index}>
              <LectureCard />
            </ListItem>
          ))} */}
        </List>
      </Collapse>
    </Box>
  );
}




const VideoInfo = (props) => {
  const { course } = props;
  return (
    <Box className="info">
      <Box
        className="info-texts"
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: "3vh",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            display: "flex",
          }}
        >
          {course.name}
        </Typography>
        <Typography
          variant="h11"
          sx={{
            display: "flex",
          }}
        >
        </Typography>
      </Box>
    </Box>
  );
};

const VideoFrame = (props) => {
  let { videoId } = props;
  videoId = videoId ?? "CWglkNBUmD4";
  return (
    <Box>
      <Box
        className="player"
        sx={{
          position: "relative",
          width: "100%",
          height: "20vh",
          pb: "56.25%",
        }}
      >
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title="Video"
          width="100%"
          height="100%"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          style={{ position: "absolute", top: 0, left: 0 }}
        />
      </Box>

      <Box className="info"></Box>
    </Box>
  );
};

const Sections = () => {
  const [vid, setVid] = useState(true);

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
    }}>
      <ButtonGroup variant='plain' size='large'
        sx={{
          marginTop: "3vh",
          display: "flex",
        }}
      >
        <Button
          onClick={() => {
            setVid(true);
          }}
        >
          Videos
        </Button>
        <Button
          onClick={() => {
            setVid(false);
          }}
        >
          Comments
        </Button>
      </ButtonGroup>
      {vid ? <FoldableButtonList sx={{ display: 'flex' }} /> : <Box />}
    </Box>
  );
};

export default function PlayScreen() {
  const [course, setCourse] = useState({});
  const [courseId, setCourseId] = useState(0);
  const [isLoaded, setLoaded] = useState(false);
  useEffect(() => {
    axios({
      method: 'GET',
      url: Util.getServerAddr() +
        `/course/detail?token=1234&courseId=${courseId ?? 0}`,
    }).then(res => {
      // localStorage.setItem("course", JSON.stringify(res.data.course));
      setCourse(res.data.content);
      setLoaded(true);
      console.log(course);
    });
  }, []);
  return (
    <>
      {!isLoaded ? <Loading /> :
        (<>
          <BackButton />

          <Box sx={{
            marginTop: '2vh'
          }}>

            <VideoFrame videoId={course.videoId} />
            <VideoInfo course={course} />
            <Sections course={course} />
          </Box>
        </>)}
    </>
  );
}

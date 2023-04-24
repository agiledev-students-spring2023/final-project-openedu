import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box, Typography, Button,
  Collapse, List, ListItem,
  ButtonGroup
} from '@mui/material';
import axios from "axios";
import { useUpdateEffect } from "react-use";
import { BackButton } from "../../containers/BackButton/BackButton";
import LectureCardButton from "./LectureCardButton";
import * as Util from "../../util/Util.mjs";
import Loading from "../../containers/Loading/Loading.jsx";

function FoldableButtonList(props) {
  const { lectures, setVideoId, setIndex } = props;


  return (
    <Box >
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

        {lectures.map((lecture, index) => (
          <ListItem disablePadding key={index}>
            <LectureCardButton {...lecture} index={index} setVideoId={setVideoId} setIndex={setIndex} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}




export default function PlayScreen() {
  const [lectures, setLectures] = useState(null);
  const [isLoaded, setLoaded] = useState(false);
  const [isInit, setIsInit] = useState(true);
  const [vid, setVid] = useState(true);
  const [videoId, setVideoId] = useState('CWglkNBUmD4')
  const [index, setIndex] = useState(0);
  const { courseId } = useParams();


  useUpdateEffect(() => {
    setLoaded(true);
    setVideoId(lectures[0].resourceId.videoId);
  }
    , [lectures]);

  useEffect(() => {
    axios({
      method: 'GET',
      url: Util.getServerAddr() +
        `/course/play?token=1234&courseId=${courseId ?? 0}`,
    }).then(res => {
      // localStorage.setItem("course", JSON.stringify(res.data.course));
      const lecturesArr = res.data.content.map((lecture) => {
        return lecture.snippet
      })
      setLectures(lecturesArr);
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

            <Box className="videoFrame">
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

            <Box className="videoInfo">
              <Box
                className="info-texts"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "3vh",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    display: "flex",
                    textAlign: "left",
                  }}
                >
                  {lectures[index].title}
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


            <Box className="section"
              sx={{
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
              {vid ? <FoldableButtonList
                lectures={lectures}
                setVideoId={setVideoId}
                setIndex={setIndex}
                sx={{ display: 'flex' }} /> : <Box />}
            </Box>
          </Box>
        </>)}
    </>
  );
}

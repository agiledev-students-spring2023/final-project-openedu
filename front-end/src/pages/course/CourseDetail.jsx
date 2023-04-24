import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Card, Paper, Typography, Button, Divider, Rating } from "@mui/material";
import { Favorite, PlayArrowRounded } from "@mui/icons-material";
import { CommentCard } from "./CommentCard";
import * as Constants from "../../util/Constants.mjs";
import * as Logger from "../../util/Logger.mjs";
import { useParams } from "react-router-dom";
import * as Util from "../../util/Util.mjs";
import axios from "axios";
import { BackButton } from "../../containers/BackButton/BackButton";
import Loading from "../../containers/Loading/Loading";


const Main = (props) => {
  const navigate = useNavigate();
  const { course } = props;
  const [imageUrl, setImageUrl] = useState(null);
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
            backgroundImage: `url(${course.imageUrl})`,
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
            {course.name ? course.name : "Unknown Course"}
          </Typography>
          <Typography
            variant='h11'
            sx={{
              display: 'flex',
            }}
          >
            {course.university ? course.university : "Unknown university"}
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
            onClick={() => { navigate(`/courses/play/${course.courseId}`); }}>
            <PlayArrowRounded />
            Play </Button>
          <Button
            variant='contained'
            color="error"
            sx={{
              width: "45%",
              display: 'flex',
            }}
            onClick={() => { }}>
            <Favorite />
            Favorite </Button>

        </Box>
      </Box>
      <InfoSec course={course} />
    </Box>
  );
};

const InfoSec = (props) => {
  const { instructor1, instructor2, instructor3,
    description, courseHours, prerequisites, difficulty, language } = props.course;
  return (
    <Box>
      <Box sx={{
        marginTop: '2vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
      }}>
        <Typography sx={{}}>
          Instructor(s):
        </Typography >
        <Typography sx={{ marginLeft: '15%' }}>{`${instructor1 === '' ? 'Unknown' : `${instructor1}`} ${instructor2 === '' ? '' : `, ${instructor2}`}`}</Typography>


        <Typography sx={{ display: 'flex', justifyContent: 'center' }}>
          Difficulty:
          <Rating name="read-only" value={difficulty} readOnly precision={0.5} sx={{
            '& .MuiRating-iconEmpty': {
              color: '#fff',
            }
          }} />
        </Typography >


        <Typography sx={{}}>
          Prerequisites:
        </Typography >
        <Typography sx={{ marginLeft: '15%',textAlign:'left' }}>{prerequisites}</Typography>

        <Typography sx={{}}>
          Languages:
        </Typography >
        <Typography sx={{ marginLeft: '15%' }}>{language}</Typography>

        <Typography sx={{}}>
          Course Hour:
        </Typography >
        <Typography sx={{ marginLeft: '15%' }}>{courseHours}</Typography>
      </Box>
      <Box sx={{ marginTop: '20px' }}>
        <Typography sx={{ fontWeight: 'bold', float: 'left', clear: 'both', fontSize: '20px', textAlign:'left' }}>Introduction:</Typography>
        <Typography sx={{
          maxHeight: { lg: '120px', sm: '100px', xs: '50px' },
          overflow: 'scroll',
          clear: 'both',
          textAlign:'left'
        }}>
          {description}
        </Typography>
      </Box>
    </Box>
  );
};




export const CourseDetail = () => {

  const [comments, setComments] = useState(undefined);
  const [course, setCourse] = useState({});
  const [isLoaded, setLoaded] = useState(false);
  const baseURL = Util.getServerAddr();
  const { courseId } = useParams(0);

  Logger.verbose(CourseDetail.name + " Loaded!");
  Logger.verbose("URL: " + baseURL + `/course/detail?token=1234&courseId=${courseId ?? 0}`);

  useEffect(() => {
    axios
      .get(Util.getServerAddr() + `/course/detail?token=1234&courseId=${courseId ?? 0}`)
      .then((response) => {

        Logger.info(
          `CourseDetail's axios got the following data: \n ${response.data["content"]}`
        );

        setCourse(response.data["content"]);
        console.log(response.data["content"]);
        setLoaded(true);
      })
      .catch((err) => {
        Logger.error("error fetching subject information");
        Logger.error(err);

        //const backupData =
        setCourse([
          {
            courseId: 3,
            name: "backup_course",
            description: "backupDescription",
          },
        ]);

        setLoaded(true);
        //setData((backupData??[])[0])
      });

    // setComments([
    //   {
    //     userId: 0,
    //     userName: "abc",
    //     msg: "haha",
    //   },
    //   {
    //     userId: 1,
    //     userName: "abcd",
    //     msg: "hahahahaha",
    //   },
    // ]);

  }, []);

  // useEffect(() => {
  //   axios({
  //     method: 'GET',
  //     url: Util.getServerAddr() +
  //       `/course/detail?token=1234&courseId=${courseId ?? 0}`,
  //   }).then(res => {
  //     // localStorage.setItem("course", JSON.stringify(res.data.course));
  //     setCourse(res.data.content);
  //     setLoaded(true);
  //   });
  // }, []);




  //const imgUrl = Mockaroo.mockImageApi(1920,1080);

  //Logger.info(`Image URL: ${imgUrl}`);

  return (
    <>
      <BackButton />
      {isLoaded ? (<>
        <Main course={course} />
      </>) : <Loading />}
    </>
  );
};

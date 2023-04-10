import { React, useEffect, useState } from "react";
import { Box, CardMedia, Paper, Typography, useTheme } from "@mui/material";
import { CommentCard } from "./CommentCard";
import * as Constants from "../../util/Constants.mjs";
import * as Logger from "../../util/Logger.mjs";
import { useParams } from "react-router-dom";
import * as Util from "../../util/Util.mjs";
import axios from "axios";
import { BackButton } from "../../containers/BackButton/BackButton";

export const CourseDetail = () => {
  //TODO: Put useState here
  const [courseInfo, setCourseInfo] = useState(undefined);
  const [comments, setComments] = useState(undefined);
  const [isLoaded, setLoaded] = useState(false);
  //const theme = useTheme();

  const { courseId } = useParams();

  Logger.verbose(CourseDetail.name + " Loaded!");

  Logger.verbose(
    "URL: " +
      Util.getServerAddr() +
      `/course/detail?token=1234&courseId=${courseId ?? 0}`
  );

  useEffect(() => {
    //TODO: Fetch actual data, use props.courseId
    //
    // setCourseInfo({
    //   courseId: 0,
    //   name: "foo",
    //   detail: "ipsum_lorem",
    //   language: "Java",
    //   difficulty: "Hard",
    //   url: "https://youtube.com",
    // });

    axios
      .get(
        Util.getServerAddr() +
          `/course/detail?token=1234&courseId=${courseId ?? 0}`
      )
      .then((response) => {
        Logger.info(
          `CourseDetail's axios got the following data: \n ${response.data["content"]}`
        );

        setCourseInfo(response.data["content"]);

        setLoaded(true);
      })
      .catch((err) => {
        Logger.error("error fetching subject information");
        Logger.error(err);

        //const backupData =
        setCourseInfo([
          {
            courseId: 3,
            name: "backup_course",
            description: "backupDescription",
            imageUrl: "https://picsum.photos/1920/1080",
          },
        ]);

        setLoaded(true);
        //setData((backupData??[])[0])
      });

    setComments([
      {
        userId: 0,
        userName: "abc",
        msg: "haha",
      },
      {
        userId: 1,
        userName: "abcd",
        msg: "hahahahaha",
      },
    ]);
  }, []);

  //const imgUrl = Mockaroo.mockImageApi(1920,1080);

  //Logger.info(`Image URL: ${imgUrl}`);

  return (
    <>
      <BackButton />

      {isLoaded ? (
        <div>
          <Box
            sx={{
              margin: Constants.UI_HORIZ_OFFSET,
            }}
          >
            {/*Course Image*/}
            <CardMedia
              alt="course_image"
              image={courseInfo.imageUrl ?? "https://picsum.photos/1920/1080"}
              sx={{
                height: 200,
                borderRadius: Constants.UI_CORNER_RADIUS,
              }}
            />

            {/* Course Title and Description Section */}
            <Box
              sx={{
                marginY: 3,
              }}
            >
              {/*Course Name*/}
              <Typography
                variant="h2"
                sx={{
                  //margin: Constants.UI_HORIZ_OFFSET,
                  textAlign: "left",
                  fontWeight: "bold",
                  //fontFamily: 'Roboto',
                  letterSpacing: 2,
                  //color: "text.primary",
                }}
              >
                {courseInfo.name}
              </Typography>

              {/*Course Description*/}
              <Typography
                variant="h5"
                sx={{
                  //fontFamily: 'Roboto',
                  textAlign: "left",
                }}
              >
                {courseInfo.detail}
              </Typography>
            </Box>

            {/* Course Information Section */}
            <Paper
              elevation={0}
              sx={{
                boxShadow: 1,
                marginY: 3,
                borderRadius: Constants.UI_CORNER_RADIUS,
                padding: Constants.UI_CORNER_RADIUS / 2,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  textAlign: "left",
                  fontFamily: "sans-serif",
                }}
              >
                Language: {courseInfo.language}
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  textAlign: "left",
                }}
              >
                Difficulty: {courseInfo.difficulty}
              </Typography>

              <a href={courseInfo.url}></a>
            </Paper>

            {/*//<Divider/>*/}
            {comments.map((element) => (
              <CommentCard
                key={element.userId}
                userName={element.userName}
                msg={element.msg}
              />
            ))}
          </Box>
        </div>
      ) : (
        <h1>Fetching data...</h1>
      )}
    </>
  );
};

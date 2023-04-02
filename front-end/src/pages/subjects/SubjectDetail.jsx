import React, { useEffect, useState } from "react";
import { CourseCard } from "./CourseCard.jsx";
import axios from "axios";
import ClassIcon from "@mui/icons-material/Class";
import { Typography, CardMedia, Box } from "@mui/material";
import * as Mockaroo from "../../mockApi/apis.mjs";
import { TypeAnimation } from "react-type-animation";
import * as Logger from "../../util/Logger.mjs";
import * as Constants from "../../util/Constants.mjs";

export function SubjectDetail(props) {
  const url = Mockaroo.mockDataApi(`subjects`);
  // const url = Mockaroo.mockDataApi(`subjects/${subjectId}`);

  const [data, setData] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

  const subjectId = props["subjectId"] ?? 0;

  useEffect(() => {
    console.log("fetching course information");
    axios(url)
      .then((response) => {
        setData(response.data);
        setLoaded(true);
      })
      .catch((err) => {
        console.log("error fetching subject information");
        console.log(err);

        setData([
          {
            id: 3,
            avatar: ClassIcon,
            name: "backupSubject",
            description: "backupDescription",
            completionRate: 37,
          },
        ]);
        setLoaded(true);

        // const backupData = [
        //   {
        //     id: 3,
        //     avatar: ClassIcon,
        //     name: "backupSubject",
        //     description: "backupDescription",
        //     completionRate: 37,
        //   },
        // ];
        // setData((backupData ?? [])[0]);
      });
  }, []);

  return (
    <>
      <Box
        sx={{
          margin: Constants.UI_HORIZ_OFFSET,
        }}
      >
        {/*Course Image*/}
        <CardMedia
          alt="course_image"
          image={Mockaroo.mockImageApi(1920, 1080)}
          sx={{
            height: 300,
            borderRadius: Constants.UI_CORNER_RADIUS,
          }}
        />
        <Box
          sx={{
            marginY: 3,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              // margin: Constants.UI_HORIZ_OFFSET,
              textAlign: "left",
              fontWeight: "bold",
              // fontFamily: 'Roboto',
              letterSpacing: 2,
              //color: "text.primary",
            }}
          >
            Courses
          </Typography>
          <Typography
            variant="h5"
            sx={{
              textAlign: "left",
            }}
          >
            {subjectId.name}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              textAlign: "left",
            }}
          >
            {subjectId.description}
          </Typography>
          <TypeAnimation
            sequence={[
              "Which course would you like to learn today?", // Types 'One'
              1000, // Waits 1s
              "Pick one that interests you!",
              2000,
              "Pick a Course, take a look at it!",
              3000,

              async () => {
                Logger.verbose("SubjectDetail: Typewriter Sequence completed"); // Place optional callbacks anywhere in the array
              },
            ]}
            wrapper="span"
            cursor={true}
            repeat={0}
            style={{ fontSize: "1em", display: "inline-block" }}
          />
        </Box>

        {data.map((entry, index) => (
          <CourseCard key={index} entry={entry} />
        ))}
      </Box>
    </>
  );
}

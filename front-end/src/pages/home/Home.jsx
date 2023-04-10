import {
  Box,
  Typography,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  createTheme,
  Grid,
  ThemeProvider,
} from "@mui/material";
import { CreateOutlined, Restore, Favorite } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import BackgroundImage from "../../containers/BackgroundImage";
import { useNavigate, useParams } from "react-router-dom";
import CourseCard from "../../containers/CourseCard/CourseCardAtHome";
import { getTheme } from "../../util/Util.mjs";
import axios from "axios";
import ClassIcon from "@mui/icons-material/Class";
import * as Util from "../../util/Util.mjs";
import * as Logger from "../../util/Logger.mjs";

function CourseTypeToggleButton({ value, onChange }) {
  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={onChange}
      aria-label="Platform"
      align="center"
      sx={{
        marginLeft: "5%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <ToggleButton value="Recent">Recent</ToggleButton>
      <ToggleButton value="Suggestion">Suggestion</ToggleButton>
    </ToggleButtonGroup>
  );
}

const CourseSlide = ({ data }) => {
  return (
    <Box
      sx={{
        marginTop: "5%",
        marginLeft: "2.3vh",
        display: "flex",
        justifyContent: "center",
        marginRight: "2.3vh",
      }}
    >
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 6, sm: 8, md: 12 }}
      >
        {data.slice(0, 6).map((entry, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <CourseCard key={index} entry={entry} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export function Home(props) {
  const navigate = useNavigate();

  const [alignment, setAlignment] = React.useState("Recent");
  const [data, setData] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

  console.log(data);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const { courseId } = useParams();

  // Logger.verbose("URL: " + url);

  useEffect(() => {
    if (alignment === "Recent") {
      // get recent
      console.log("fetching course information");
      axios
        .get(
          Util.getServerAddr() +
            `/course/recent?token=1234&subjectId=${courseId ?? 0}`
        )
        .then((response) => {
          Logger.info(
            `SubjectList's axios got the following data: \n ${response.data}`
          );
          setData(response.data["content"]);

          setLoaded(true);
        })
        .catch((err) => {
          Logger.error("error fetching subject information");
          Logger.error(err);

          //const backupData =
          setData([
            {
              id: 3,
              name: "backupRecentSubject",
              description: "backupRecentDescription",
              completionRate: 37,
            },
          ]);

          setLoaded(true);
          //setData((backupData??[])[0])
        });
    } else if (alignment === "Suggestion") {
      // get suggested
      console.log("fetching subject information");
      axios
        .get(
          Util.getServerAddr() +
            `/course/recommend?token=1234&subjectId=${courseId ?? 0}`
        ) //Todo: add SuggestedSubject URL here
        .then((response) => {
          Logger.info(
            `SubjectList's axios got the following data: \n ${response.data}`
          );
          setData(response.data["content"]);

          setLoaded(true);
        })
        .catch((err) => {
          Logger.error("error fetching subject information");
          Logger.error(err);

          //const backupData =
          setData([
            {
              id: 3,
              name: "backupSubject",
              description: "backupDescription",
              completionRate: 37,
            },
          ]);

          setLoaded(true);
          //setData((backupData??[])[0])
        });
    }
  }, [alignment]);

  return (
    <Box>
      <BackgroundImage />
      <Box>
        <Box
          className="welcome_line"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: 1,
            alignItems: "center",
            marginTop: "20vh",
            marginBottom: "6vh",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "5%",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontFamily: "Raleway",
                display: "flex",
                fontSize: "30px",
              }}
            >
              Welcome,
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontWeight: "900",
                display: "flex",
                fontSize: "45px",
              }}
            >
              UserName!
              {/*get username from backend*/}
            </Typography>
          </Box>
          <Button
            onClick={() => {
              navigate("/profile/edit");
            }}
          >
            <CreateOutlined
              sx={{
                display: "flex",
                marginRight: "5%",
                color: "text.primary",
              }}
            />
          </Button>
        </Box>
      </Box>

      <Box
        className="tabs"
        sx={{
          borderRadius: "24px",
          backgroundColor: "background.default",
          position: "absolute",
          left: "0",
          width: "1",
          display: "flex",
          flexDirection: "column",
          paddingBottom: "5vh",
          //todo: change container position here
        }}
      >
        <Box
          className="recent"
          color="primary"
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: "5%",
            marginLeft: "2.3vh",
          }}
        >
          <Box
            sx={{
              margin: "auto",
            }}
          >
            <CourseTypeToggleButton value={alignment} onChange={handleChange} />
          </Box>
        </Box>

        <CourseSlide data={data} className="courseCards" />
      </Box>
    </Box>
  );
}

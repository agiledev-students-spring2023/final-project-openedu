import {
  Box,
  Typography,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  createTheme,
  Grid,
} from "@mui/material";
import { CreateOutlined, Restore, Favorite } from "@mui/icons-material";
import React, { useEffect } from "react";
import BackgroundImage from "../../containers/BackgroundImage";
import { useNavigate } from "react-router-dom";
import CourseCard from "../../containers/CourseCard/CourseCardAtHome";

const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});
function CourseTypeToggleButton() {
  const [alignment, setAlignment] = React.useState("Recent");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      color="secondary"
      value={alignment}
      exclusive
      onChange={handleChange}
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

const CourseSlide = (props) => {
  return (
    <Box
      sx={{
        marginTop: "5%",
        marginLeft: "2.3vh",
        display: "flex",
        justifyContent: "space-between",
        marginRight: "2.3vh",
      }}
    >
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 6, sm: 8, md: 12 }}
      >
        {Array.from(Array(6)).map((_, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <CourseCard />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export function Home(props) {
  const navigate = useNavigate();
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
          paddingBottom: "10vh",
        }}
      >
        <Box
          className="recent"
          color="primary"
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: "3vh",
            marginLeft: "2.3vh",
          }}
        >
          <CourseTypeToggleButton />
        </Box>

        <CourseSlide className="courseCards" />
      </Box>
    </Box>
  );
}

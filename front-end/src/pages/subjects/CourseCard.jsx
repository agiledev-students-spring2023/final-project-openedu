import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Grid,
  CardContent,
  Typography,
  Box,
  CardMedia,
  LinearProgress,
} from "@mui/material";
import * as Constants from "../../util/Constants.mjs";
import * as PropTypes from "prop-types";
import * as Mockaroo from "../../mockApi/apis.mjs";

//need fix during Sprint3,
function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

export function CourseCard({ entry }) {
  const navigate = useNavigate();
  const routeChange = () => {
    navigate(`/courses/detail/${entry.courseId}`);
  };
  return (
    <Grid
      sx={{
        // minWidth: 200,
        // margin: Constants.UI_HORIZ_OFFSET,
        paddingY: Constants.UI_CORNER_RADIUS / 4,
        borderRadius: Constants.UI_CORNER_RADIUS * 2,
        marginBottom: 2,
      }}
    >
      <Card>
        <CardContent>
          <CardMedia
            sx={{
              borderRadius: Constants.UI_HORIZ_OFFSET,
            }}
            component="img"
            height="140"
            image={entry.imageUrl ?? "Course Image"}
            alt="green iguana"
          />
          <Typography variant="h5" component="div">
            {entry.name ?? "Course Name"}
          </Typography>
          <Typography variant="body" component="div">
            {entry.description ?? "Course Description"}
          </Typography>
          {/*<Typography variant="caption" component="div">*/}
          {/*  CompletionRate: {entry.completionRate ?? 0}*/}
          {/*</Typography>*/}
          <Box
            sx={{
              display: "Grid",
            }}
          >
            <Box
              sx={{
                width: "100%",
              }}
            >
              <LinearProgressWithLabel
                value={entry.completionRate ?? 0}
                component="div"
              />
            </Box>
            <Button variant="contained" component="div" onClick={routeChange}>
              Continue
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}

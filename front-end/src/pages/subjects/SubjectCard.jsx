import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import {
  Box,
  Button,
  CardContent,
  CardMedia,
  Grid,
  LinearProgress,
  Typography,
  useTheme,
} from "@mui/material";
import * as Constants from "../../util/Constants.mjs";
import * as PropTypes from "prop-types";

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
export function SubjectCard(
  /** @type {{ entry: { id: number; name: string; description: string; completionRate: number; } }} */
  { entry }
) {
  const navigate = useNavigate();
  const theme = useTheme();
  const routeChange = () => {
    navigate(`../detail/${entry.subjectId}`);
  };

  //Logger.verbose(`Image URL: ${entry.imageUrl}`);

  return (
    <Grid
      sx={{
        // minWidth: 200,
        // margin: Constants.UI_HORIZ_OFFSET,
        padding: Constants.UI_CORNER_RADIUS / 4,
        borderRadius: Constants.UI_CORNER_RADIUS * 2,
        marginBottom: 2,
      }}
    >
      <Card
        sx={{
          marginBottom: 2,
        }}
      >
        <CardContent>
          <CardMedia
            sx={{
              borderRadius: Constants.UI_HORIZ_OFFSET,
            }}
            id={entry.subjectId ?? 0}
            component="img"
            height="140"
            image={entry.imageUrl ?? "Subject Image"}
            //Todo: change to backend
            //alt="green iguana"
          />
          <Typography variant="h5" component="div">
            {entry.name ?? "Subject Name"}
          </Typography>
          <Typography variant="body" component="div">
            {entry.description ?? "Subject Description"}
          </Typography>
          {/*<Typography variant="subtitle" component="div">*/}
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
            <Button variant="contained" onClick={routeChange}>
              Learn More
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}

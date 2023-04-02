import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
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
import * as Mockaroo from "../../mockApi/apis.mjs";

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
    navigate(`../detail/${entry.id}`);
  };

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
            component="img"
            height="140"
            image={Mockaroo.mockImageApi(1920, 1080)}
            alt="green iguana"
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

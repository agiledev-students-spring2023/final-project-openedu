import React from "react";
import { Box, Paper, Typography } from "@mui/material";

export default function CourseCardAtHome({ entry }) {
  const { name, completionRate } = entry.name
    ? entry
    : { name: "Title", completionRate: 0 };

  const cardSize = 106;



  return (
    <Paper
      variant="outlined"
      elevation={0}
      square

      sx={{
        width: cardSize,
        height: cardSize,
        borderRadius: "20px",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(${entry.imageUrl ?? "Course Image"})`,
      }}

    >
      <Box

        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: "50%",
          marginLeft: "10%",
        }}

      >
        <Typography
          variant="h6"
          sx={{
            display: "flex",
            fontSize: "15px",
              fontWeight: "bold",
              textTransform: "capitalize"
          }}
        >

          {name}

        </Typography>
        <Typography
          sx={{
            display: "flex",
            fontSize: "15px",
            fontWeight: "medium",
              letterSpacing: 1,
          }}
        >

          {completionRate}

        </Typography>
      </Box>
    </Paper>
  );
}

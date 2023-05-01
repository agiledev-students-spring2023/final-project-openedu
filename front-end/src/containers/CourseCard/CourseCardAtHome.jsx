import React from "react";
import {Backdrop, Box, Paper, Typography} from "@mui/material";

export default function CourseCardAtHome({ entry }) {
  const { name, completionRate } = entry.name
    ? entry
    : { name: "Title", completionRate: 0 };

  const cardSize = 106;



  return (
  <>
    <Paper
      variant="outlined"
      elevation={0}
      square

      sx={{
        display: "flex",
        width: cardSize,
        height: cardSize,
        borderRadius: "20px",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(${entry.imageUrl ?? "Course Image"})`,
          // filter: "blur(3px)"
      }}

    />
    <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: "10%",
          marginLeft: "5%",
        }}

    >
    <Typography
          variant="h6"
          sx={{
            display: "flex",
            fontSize: "15px",
            fontWeight: "bold",
            textTransform: "capitalize",
            color: "white",
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
    </>
  );
}

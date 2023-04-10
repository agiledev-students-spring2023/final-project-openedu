import React, { useState, useEffect } from "react";
import { Box, Paper, Typography } from "@mui/material";

import { mockImageApi } from "../../mockApi/apis.mjs";
export default function CourseCardAtHome({ entry }) {
  const { name, completionRate } = entry.name
    ? entry
    : { name: "Title", completionRate: 0 };


  const cardSize = 106;

  const [imageUrl, setImageUrl] = useState(null);
  useEffect(() => {
    axios
      .get(Util.getServerAddr() + "/background-image", {
        params: { token: "1234", width: "200", height: "200" },
      })
      .then((response) => {
        setImageUrl(response.data["content"]);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <Paper
      variant="outlined"
      elevation={0}
      sx={{
        width: cardSize,
        height: cardSize,
        backgroundColor: "#F5F5F5",
        borderRadius: "20px",
        // barder: "1px solid #E0E0E0",
        backgroundSize: 'cover',
        backgroundImage: `url(${entry.imageUrl ?? "Course Image"})`,
        

      }}
      square
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
            fontSize: "16px",
          }}
        >
          {name}
        </Typography>
        <Typography
          sx={{
            display: "flex",
            fontSize: "8px",
          }}
        >
          {completionRate}
        </Typography>
      </Box>
    </Paper>
  );
}

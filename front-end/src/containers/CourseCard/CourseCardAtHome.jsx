import React, { useState, useEffect } from "react";
import { Box, Paper, Typography } from "@mui/material";
import axios from "axios";
import * as Util from "../../util/Util.mjs";
export default function CourseCardAtHome(props) {
  const { title, completeness } = props.title
    ? props
    : { title: "Title", completeness: 0 };

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
      sx={{
        width: cardSize,
        height: cardSize,
        backgroundColor: "#F5F5F5",
        borderRadius: "20px",
        barder: "1px solid #E0E0E0",
        backgroundImage: `url(${imageUrl})`,
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
          {title}
        </Typography>
        <Typography
          sx={{
            display: "flex",
            fontSize: "8px",
          }}
        >
          {completeness}
        </Typography>
      </Box>
    </Paper>
  );
}

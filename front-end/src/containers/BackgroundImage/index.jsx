import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import axios from "axios";
import * as Util from "../../util/Util.mjs";

// mainly for beginning pages like home/login..
export default function BackgroundImage() {
  const [imageUrl, setImageUrl] = useState(null);
  useEffect(() => {
    const { width, height } = window.screen;
    axios
      .get(Util.getServerAddr() + "/background-image", {
        params: { width: width, height: height},
      })
      .then((response) => {
        setImageUrl(response.data["content"]);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <Box>
      <Box
        sx={{
          position: "absolute",
          top: "0",
          left: "0",
          zIndex: "-1",
          height: "100%",
          width: "100%",
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          //filter: "blur(2px) brightness(0.8)",
        }}
      />
    </Box>
  );
}

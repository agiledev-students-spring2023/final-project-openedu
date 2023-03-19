import React from "react";
import { Box } from "@mui/material";
import { BeginComponent } from "./BeginComponent.jsx";
import BackgroundImage from "../../../containers/BackgroundImage/index.jsx";

export function BeginPage(props) {
  return (
    <Box>
      <BackgroundImage />
      <BeginComponent />
    </Box>

  );
}

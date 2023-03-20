import React from "react";
import { Button } from "@mui/material";
import {Link} from "react-router-dom";


// This button is not incorporated into header, TBD
export function BackButton({ url, handleClick }) {
  return (
    <div>
      <Button
        component={Link}
        to={`${url}`}
        onClick={handleClick}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          padding: "5px 7px",
          gap: "10px",

          position: "absolute",
          width: "52",
          height: "34",
          left: "14",
          top: "70px",

          background: "#FFFFFF",
          border: "2px solid #000000",
          variant: "text",
          color: "#000000",
        }}
      >
        Back
      </Button>
    </div>
  );
}

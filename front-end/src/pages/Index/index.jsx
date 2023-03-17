import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Typography, Box, Button } from "@mui/material";

export default function Index() {
  function handleClick() {
    history.push("/login");
  }
  return (
    <div>
      <Box
        sx={{
          position: "absolute",
          width: "251px",
          height: "79px",
          top: "219px",
          left: "28px",
          textAlign: "center",
        }}
        backgroundColor="#D9D9D9"
      >
        <Typography
          sx={{
            margin: "auto",
            fontFamily: "Raleway",
            fontStyle: "normal",
            fontWeight: "800",
            fontSize: "50px",
            lineHeight: "59px",
          }}
        >
          LOGO
        </Typography>
      </Box>
      <Typography
        sx={{
          position: "absolute",
          width: "58px",
          height: "32px",
          left: "28px",
          top: "356px",

          fontFamily: "Arimo",
          fontStyle: "normal",
          fontWeight: "400",
          fontSize: "25px",
          lineHeight: "29px",
          textAlign: "left",
        }}
      >
        The
      </Typography>

      <Typography
        sx={{
          position: "absolute",
          width: "251px",
          height: "54px",
          left: "28px",
          top: "388px",

          fontFamily: "Arimo",
          fontStyle: "normal",
          fontWeight: "700",
          fontSize: "47px",
          lineHeight: "57px",
          textAlign: "left",
        }}
      >
        All-in-one
      </Typography>
      <Typography
        sx={{
          position: "absolute",
          width: "266px",
          height: "78px",
          left: "28px",
          top: "448px",

          fontFamily: "Arimo",
          fontStyle: "normal",
          fontWeight: "400",
          fontSize: "24px",
          lineHeight: "28px",
          textAlign: "left",
        }}
      >
        Computer Science Learning Platform
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          padding: "0px",
          gap: "8px",

          position: "absolute",
          width: "143px",
          height: "48px",
          left: "28px",
          top: "532px",

          background: "#FFFFFF",
          border: "2px solid #000000",
        }}
      >
          <Button
            component={Link}
            to="/login"
            variant="text"
            onClick={handleClick}
            sx={{ color: "black", textDecoration: "none" }}
          >
            Get Started
          </Button>
      </Box>
    </div>
  );
}

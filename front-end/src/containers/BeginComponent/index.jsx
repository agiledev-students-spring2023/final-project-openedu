import React from "react";
import { Typography, Box, TextField, Button } from "@mui/material";

const BeginComponent = (props) => {
  return (
    <div className="BeginComponent">
      <Button
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          padding: "0px",
          gap: "8px",

          position: "absolute",
          width: "83px",
          height: "40px",
          left: "360px",
          top: "29px",

          background: "#FFFFFF",
          border: "2px solid #000000",
          variant: "text",
          color: "#000000",
        }}
        >
        Back
        </Button>
        
      <Typography
        sx={{
          position: "absolute",
          width: "167px",
          height: "70px",
          left: "700px",
          top: "115px",

          fontFamily: "Raleway",
          fontStyle: "normal",
          fontWeight: "700",
          fontSize: "60px",
          lineHeight: "70px",
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          textShadow: "0px 3px 2px rgba(200, 200, 200)",
        }}
        variant="h1"
      >
        Begin
      </Typography>

      <Typography
        sx={{
          position: "absolute",
          width: "202px",
          height: "21px",
          left: "670px",
          top: "253px",

          fontFamily: "Inter",
          fontStyle: "normal",
          fontWeight: "500",
          fontSize: "16px",
          lineHeight: "19px",
          textShadow: "0px 1px 1px rgba(200, 200, 200)",
        }}
      >
        Let&apos;s start with your email
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: "0px",

          position: "absolute",
          width: "349px",
          height: "56px",
          left: "16px",
          top: "433px",

          background: "#E7E7E7",
          borderRadius: "0px",
        }}
      >
        <TextField
          type="email"
          label="Email"
          placeholder="abc@nyu.edu"
          variant="outlined"
          sx={{ width: "349px", height: "56px" }}
        />
      </Box>

      <Button
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          padding: "0px",
          gap: "8px",

          position: "absolute",
          width: "123px",
          height: "40px",
          left: "135px",
          top: "529px",

          background: "#FFFFFF",
          border: "2px solid #000000",
          variant: "text",
          color: "#000000",
        }}
      >
        Continue
      </Button>
    </div>
  );
};

export default BeginComponent;

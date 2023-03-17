import React, { useState } from "react";
import { Typography, Box, TextField, Button } from "@mui/material";

function EmailField() {
  const [email, setEmail] = useState("");
  const handleSubmit = () => {
    if (email.trim() !== "") {
      console.log("Submitting email: ", email);
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <>
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
          value={email}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
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
        onClick={handleSubmit}
      >
        Continue
      </Button>
    </>
  );
}

const BeginComponent = (props) => {
  return (
    <div className="BeginComponent">
      <Typography
        sx={{
          position: "absolute",
          width: "167px",
          height: "70px",
          left: "107px",
          top: "295px",

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
          left: "96px",
          top: "373px",

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
      <EmailField />
    </div>
  );
};

export default BeginComponent;

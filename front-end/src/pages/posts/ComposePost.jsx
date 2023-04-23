import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import axios from "axios";
import * as Util from "../../util/Util.mjs";

export default function ComposePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (event) => {
    console.log("submit");
    event.preventDefault();
    axios
      .post(Util.getServerAddr() + "/post", { title, content })
      .then((response) => console.log(response))
      .catch((error) => console.error(error));
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
        <TextField
          label="Content"
          multiline
          rows={4}
          value={content}
          onChange={(event) => setContent(event.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Box>
  );
}

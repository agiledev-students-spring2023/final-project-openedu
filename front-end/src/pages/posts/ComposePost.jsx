import React, {useState} from "react";
import {Box, TextField, Button} from "@mui/material";
import {Add, Remove} from "@mui/icons-material";
import axios from "axios";
import * as Util from "../../util/Util.mjs";

export default function ComposePost(props) {
    const {setComposeMode, setRefresh} = props;
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = (event) => {
        console.log("submit");
        event.preventDefault();
        axios
            .post(Util.getServerAddr() + "/post", {token: "12345", title, content})
            .then((response) => console.log(response))
            .catch((error) => console.error(error));
        setTitle("");
        setContent("");
        setRefresh(true);
        setComposeMode(0);
    };

    return (
        <Box>
            <form onSubmit={handleSubmit}>
                <Box>
                    <Box>

                        <TextField
                            id="title"
                            label="Title"
                            placeholder="Enter title here"
                            variant="outlined"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            sx={{width: "100%"}}
                            required
                        />


                        <TextField
                            id="content"
                            label="Content"
                            placeholder="Enter content here"
                            multiline
                            rows={6}
                            variant="outlined"
                            value={content}
                            onChange={(event) => setContent(event.target.value)}
                            sx={{
                                marginTop: "20px",
                                width: "100%"
                            }}
                            required
                        />
                    </Box>
                </Box>

                <Box>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{
                            width: "55%",
                            marginTop: "4vh",
                        }}
                    >
                        <Add/>
                        Submit
                    </Button>


                    <Button
                        variant="contained"
                        sx={{
                            width: "55%",
                            marginTop: "1vh",
                            backgroundColor: "#80808025"
                        }}
                        onClick={() => {
                            setTitle("");
                            setContent("");
                            setComposeMode(0);
                        }}
                    >
                        <Remove/>
                        Discard
                    </Button>
                </Box>
            </form>
        </Box>
    );
}

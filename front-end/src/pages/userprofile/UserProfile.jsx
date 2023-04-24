import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Add, Logout, Create } from "@mui/icons-material";
import StyledAvater from "../../containers/StyledAvatar";

import { useNavigate } from "react-router-dom";
import PostCard from "../../containers/PostCard/PostCard";
import ComposePost from "../posts/ComposePost";
import axios from "axios";
import * as Util from "../../util/Util.mjs";
import FeedIcon from "@mui/icons-material/Feed";
import * as Logger from "../../util/Logger.mjs";

export default function UserProfile() {
  const navigate = useNavigate();
  const [composeMode, setComposeMode] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [refresh, setRefresh] = useState(true);
  useEffect(() => {
    axios
      .get(Util.getServerAddr() + "/background-image", {
        params: { token: Util.readLocalValue("token") ?? 12345, width: "200", height: "200" },
      })
      .then((response) => {
        setImageUrl(response.data["content"]);
      })
      .catch((error) => Logger.error(error));
  }, []);
  return (
    <Box>
      <Box
        sx={{
          marginTop: "3vh",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{
            width: "35%",
            display: "flex",
          }}
          onClick={() => {
            setComposeMode(1);
          }}
        >
          <Add />
          Compose{" "}
        </Button>
        <Button
          variant="contained"
          color="error"
          sx={{
            width: "35%",
            display: "flex",
          }}
          onClick={() => {
            navigate("/landing/greeting");
          }}
        >
          <Logout />
          Logout{" "}
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "2vh",
        }}
      >
        <StyledAvater
          size="72px"
          alt="Hooao"
          src={imageUrl}
          sx={{
            display: "flex",
          }}
        />

        <Typography variant="h4" sx={{ fontWeight: "700" }}>
          Hooao{" "}
        </Typography>

        <Typography variant="h9" sx={{ fontWeight: "500" }}>
          Description..
        </Typography>
        <Button
          variant="contained"
          sx={{
            width: "100%",
            display: "flex",
            marginTop: "1vh",
            color: "text.secondary",
          }}
          onClick={() => {
            navigate("/profile/edit");
          }}
        >
          <Create sx={{ marginRight: "10px" }} />
          Edit Profile{" "}
        </Button>

        {/*<Button*/}
        {/*  variant="contained"*/}
        {/*  sx={{*/}
        {/*    width: "100%",*/}
        {/*    display: "flex",*/}
        {/*    marginTop: "1vh",*/}
        {/*    color: "text.secondary",*/}
        {/*  }}*/}
        {/*  onClick={() => {*/}
        {/*    navigate("/profile/feedback");*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <FeedIcon sx={{ marginRight: "10px" }} />*/}
        {/*  Feedback{" "}*/}
        {/*</Button>*/}
      </Box>

      <PostSection
        composeMode={composeMode}
        refresh={refresh}
        setRefresh={setRefresh}
      />

      <Box
        sx={{
          marginTop: "2vh",
          display: composeMode ? "block" : "none",
        }}
      >
        <ComposePost setComposeMode={setComposeMode} setRefresh={setRefresh} />
      </Box>
    </Box>
  );
}

function PostSection({ composeMode, refresh, setRefresh }) {
  //when composeMode is true this section is not rendered
  if (composeMode) return <div></div>;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(Util.getServerAddr() + `/post/list`,{
          params: {
              token: Util.readLocalValue("token") ?? 12345,
              mock: "false"
          }
      })
      .then((response) => {
        if (Array.isArray(response.data["content"])) {
          setPosts(response.data["content"]);
        } else {
          console.error(
            "Response data is not an array:",
            response.data["content"]
          );
          console.error(
            "Response data is of type",
            typeof response.data["content"]
          );
        }
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <Box
      className="postSection"
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {Array.isArray(posts) &&
        posts.map((post) => (
          <PostCard key={post.postId} postId={post.postId} post={post} />
        ))}

      <Typography sx={{ marginTop: "9%" }}>
        {posts.length} {`Post(s)`} in Total
      </Typography>
    </Box>
  );
}

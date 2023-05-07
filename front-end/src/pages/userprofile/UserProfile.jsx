import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Add, Logout, Create } from "@mui/icons-material";
import StyledAvater from "../../containers/StyledAvatar";

import { useNavigate } from "react-router-dom";
import PostCard from "../../containers/PostCard/PostCard";
import ComposePost from "../posts/ComposePost";
import axios from "axios";
import * as Util from "../../util/Util.mjs";
//import FeedIcon from "@mui/icons-material/Feed";
import * as Logger from "../../util/Logger.mjs";

export default function UserProfile() {
  const navigate = useNavigate();
  const [composeMode, setComposeMode] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    Util.invokeCallback("setNewPage", 2);

    axios
      .get(Util.getServerAddr() + "/background-image", {
        params: { width: "200", height: "200" },
      })
      .then((response) => {

          if(imageUrl === null) {
              setImageUrl(response.data["content"]);
          }
      })
      .catch((error) => Logger.error(error));

    axios
      .get(Util.getServerAddr() + "/profile/info", {
        params: {
          token: Util.readLocalValue("token") ?? 12345,
          width: "200",
          height: "200",
          mock: "false",
        },
      })
      .then((response) => {

          if (response.data["status"] !== 0) {
              Logger.info(response.data["status"]);
              Util.onAuthError(useNavigate()).then(r => true);
              return;
          }

          const user = response.data["content"];

          setUserInfo(user);

          if((user["avatar"]??"") !== "") {
              setImageUrl(user["avatar"]);
          }

      })
      .catch((error) => Logger.error(error));
  }, []);

  return (
    <Box>
      {/*Top Icon section*/}
      <Box
        sx={{
          marginTop: "20px",
          //display: "flex",
          display: !composeMode ? "flex" : "none",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{
            width: "35%",
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
          alt="avatar_img"
          src={imageUrl}
          sx={{
            display: "flex",
          }}
        />

        <Typography variant="h4" sx={{ fontWeight: "700" }}>
          {(userInfo ?? {})["name"] ?? "Earthling"}
        </Typography>

        <Typography variant="h9" sx={{ fontWeight: "300" }}>
          {(userInfo ?? {})["motto"] ??
            "No description. Add one by editing your profile below!"}
        </Typography>

        {/*Edit Profile Button*/}
        <Button
          variant="contained"
          sx={{
            width: "100%",
            display: !composeMode ? "flex" : "none",
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

        {/*Feedback Button*/}
        {/*<Button*/}
        {/*  variant="contained"*/}
        {/*  sx={{*/}
        {/*    width: "100%",*/}
        {/*      display: !composeMode ? 'flex' : 'none',*/}
        {/*    marginTop: "1vh",*/}
        {/*      backgroundColor: "#80808025"*/}
        {/*  }}*/}
        {/*  onClick={() => {*/}
        {/*    navigate("/profile/feedback");*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <FeedIcon sx={{ marginRight: "10px" }} />*/}
        {/*  Feedback{" "}*/}
        {/*</Button>*/}
      </Box>

      <PostSection composeMode={composeMode} />

      <Box
        sx={{
          marginTop: "2vh",
          display: composeMode ? "block" : "none",
        }}
      >
        <ComposePost setComposeMode={setComposeMode} />
      </Box>
    </Box>
  );
}

function PostSection({ composeMode }) {
  //when composeMode is true this section is not rendered
  if (composeMode) return <div></div>;
  const [posts, setPosts] = useState([]);

  const nav = useNavigate();

  useEffect(() => {
    axios
      .get(Util.getServerAddr() + `/post/all`, {
        params: {
          token: Util.readLocalValue("token") ?? 12345,
          mock: "false",
        },
      })
      .then((response) => {
        if (response.data["status"] !== 0) {
          Logger.info(response.data["status"]);
          Util.onAuthError(nav).then((r) => true);
          return;
        }

        setPosts(response.data["content"]);

        // if (Array.isArray(response.data["content"])) {
        //     setPosts(response.data["content"]);
        // } else {
        //     Logger.error(
        //         "Response data is not an array:",
        //         response.data["content"]
        //     );
        //     Logger.error(
        //         "Response data is of type",
        //         typeof response.data["content"]
        //     );
        // }
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

import { React, useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { BackButton } from "../../containers/BackButton/BackButton";
import Loading from "../../containers/Loading/Loading";
import * as Util from "../../util/Util.mjs";
import * as Logger from "../../util/Logger.mjs";
import axios from "axios";

export function ViewPost() {
  const { postId } = useParams();
  console.log(postId);
  const [postTitle, setPostTitle] = useState(undefined);
  const [postContent, setPostContent] = useState(undefined);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    axios
      .get(Util.getServerAddr() + `/post?token=1234&postId=${postId ?? 0}`)
      .then((response) => {
        Logger.info(
          `ViewPost's axios got the following data: \n ${response.data["content"]["title"]}`
        );

        setPostTitle(response.data["content"]["title"]);
        setPostContent(response.data["content"]["content"]);

        setLoaded(true);
      })
      .catch((err) => {
        Logger.error("error fetching post information");
        Logger.error(err);

        setPostTitle("backup_post");
        setPostContent("backup_post_info");

        setLoaded(true);
      });
  }, []);

  console.log(postTitle);

  return (
    <Box>
      <BackButton />
      {isLoaded ? (
        <ReactMarkdown>{`# ${postTitle}\n\n${postContent}`}</ReactMarkdown>
      ) : (
        <Loading />
      )}
    </Box>
  );
}

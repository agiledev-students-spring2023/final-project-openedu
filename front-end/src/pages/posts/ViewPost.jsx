import { React, useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import MDEditor from "@uiw/react-md-editor";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { BackButton } from "../../containers/BackButton/BackButton";
import Loading from "../../containers/Loading/Loading";
import * as Util from "../../util/Util.mjs";
import * as Logger from "../../util/Logger.mjs";
import axios from "axios";

export function ViewPost() {
  const theme = useTheme();
  const { postId } = useParams();
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postDate, setPostDate] = useState("");
  const [isPostLoaded, setIsPostLoaded] = useState(false);

  useEffect(() => {
    if (!postId) {
      return;
    }
    axios
      .get(Util.getServerAddr() + `/post?token=1234&postId=${postId}`)
      .then(({ data }) => {
        setPostTitle(data?.content?.title ?? "backup_post");
        setPostContent(data?.content?.content ?? "backup_post_info");
        setPostDate(data?.content?.date ?? "backup_post_date");
        setIsPostLoaded(true);
      })
      .catch((err) => {
        Logger.error("error fetching post information");
        Logger.error(err);
        setPostTitle("backup_post");
        setPostContent("backup_post_info");
        setPostDate("backup_post_date");
        setIsPostLoaded(true);
      });
  }, [postId]);

  const styles = {
    markdownWrapper: {
      margin: "24px 0",
      padding: "16px",
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    },
    metadataWrapper: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "16px",
      backgroundColor: "#f8f8f8",
      padding: "8px",
      borderRadius: "8px",
    },
  };

  return (
    <Box>
      <BackButton />
      {isPostLoaded ? (
        <Box sx={{ marginLeft: "5%" }}>
          <MDEditor.Markdown
            source={`## ${postTitle}\n\n${postContent}`}
            style={{
              width: "94%",
              textAlign: "left",
              backgroundColor: theme.palette.background.default,
              color: theme.palette.text.primary,
            }}
          />
          <Box sx={styles.metadataWrapper}>
            <Typography variant="subtitle1" sx={{ color: "#666" }}>
              {" "}
              {new Date(postDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </Typography>
          </Box>
        </Box>
      ) : (
        <Loading />
      )}
    </Box>
  );
}

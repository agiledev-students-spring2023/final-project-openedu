import { React, useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import MDEditor from "@uiw/react-md-editor";
import { Box, Typography, IconButton } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import {useNavigate, useParams} from "react-router-dom";
import { BackButton } from "../../containers/BackButton/BackButton";
import Loading from "../../containers/Loading/Loading";
import * as Util from "../../util/Util.mjs";
import * as Logger from "../../util/Logger.mjs";
import axios from "axios";

export function ViewPost() {
  const theme = useTheme();
  const { postId } = useParams();

  const [post, setPost] = useState(null);
  const [isPostLoaded, setIsPostLoaded] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    axios
      .get(Util.getServerAddr() + `/post/detail`, {
        params: {
          token: Util.readLocalValue("token") ?? 12345,
          mock: "false",
          postId: postId,
        },
      })
      .then((response) => {

        if (response.data["status"] !== 0) {
          Logger.info(response.data["status"]);
          Util.onAuthError(useNavigate()).then(r => true);
          return;
        }

        setPost(response.data["content"]);
        setIsSaved(response.data["content"]["isSaved"]);

        setIsPostLoaded(true);
      })
      .catch((err) => {
        Logger.error("error fetching post information");
        Logger.error(err);

        setPost({
          title: "backup_post",
          content: "backup_post_content",
          createTime: "backup_post_date",
        });

        setIsPostLoaded(true);
      });
  }, [postId]);

  const handleOnSave = () => {
    axios
      .post(Util.getServerAddr() + `/post/save`, {
        token: Util.readLocalValue("token") ?? 12345,
        mock: "false",
        postId: postId,
        isSaved: !isSaved,
      })
      .then((response) => {
        Logger.info(response);
      })
      .catch((err) => {
        Logger.error(err);
      });

    setIsSaved(!isSaved);
  };

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
            source={`## ${(post ?? {})["title"] ?? ""}\n\n${
              (post ?? {})["content"] ?? ""
            }`}
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
              {new Date((post ?? {})["createTime"] ?? "").toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                }
              )}
            </Typography>
          </Box>
          <IconButton onClick={handleOnSave} aria-label="heart button">
            {isSaved ? (
              <Favorite fontSize="large" style={{ color: "#FF4081" }} />
            ) : (
              <FavoriteBorder fontSize="large" style={{ color: "#FF4081" }} />
            )}
          </IconButton>
        </Box>
      ) : (
        <Loading />
      )}
    </Box>
  );
}

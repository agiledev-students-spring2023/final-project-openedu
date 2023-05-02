import React, { useState, useCallback } from "react";
import {
  Card,
  Divider,
  CardActions,
  CardContent,
  Box,
  Button,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import axios from "axios";
import { getServerAddr, readLocalValue } from "../../util/Util.mjs";
import { info, error } from "../../util/Logger.mjs";

const StyledCard = styled(Card)({
  borderRadius: "15px",
});

export default function PostCard({ postId, post }) {
  const [isSaved, setIsSaved] = useState(post.isSaved ?? false);
  const navigate = useNavigate();

  const handleReadMore = useCallback(() => {
    navigate(`/post/view/${postId || "0"}`);
    if (postId === undefined) {
      error("postId is undefined");
    }
  }, [postId, navigate]);

  const handleOnSave = useCallback(() => {
    axios
      .post(`${getServerAddr()}/post/save`, {
        token: readLocalValue("token") ?? 12345,
        mock: false,
        postId,
        isSaved: !isSaved,
      })
      .then((response) => {
        info(JSON.stringify(response.data));
      })
      .catch((err) => {
        error(err);
      });

    setIsSaved(!isSaved);
  }, [postId, isSaved]);

  const postDate = React.useMemo(
    () => post.createTime?.slice(0, 10),
    [post.createTime]
  );

  return (
    <Grid item xs={12} md={6} lg={4} sx={{ paddingTop: "20px" }}>
      <StyledCard>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <React.Fragment>
              <Typography variant="h6" align="left">
                {post.title}
              </Typography>
              <Typography variant="caption">{postDate}</Typography>
            </React.Fragment>
          </Box>
          <Divider
            color="#D9D9D9"
            sx={{
              borderBottomWidth: 2,
              marginTop: "4px",
            }}
          />
          <Typography
            variant="body2"
            color="text.secondary"
            align="left"
            sx={{
              display: "flex",
              marginTop: "4px",
            }}
          >
            {post.overview}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <Button
            size="small"
            onClick={handleReadMore}
            sx={{
              backgroundColor: "primary.main",
              color: "#fff",
              width: "50%",
              borderRadius: "8px",
              transition: "background-color 0.3s ease-in-out",
              "&:hover": {
                backgroundColor: "#212d61",
              },
            }}
          >
            Read More
          </Button>

          <IconButton onClick={handleOnSave} aria-label="heart button">
            {isSaved ? (
              <Favorite fontSize="medium" style={{ color: "#FF4081" }} />
            ) : (
              <FavoriteBorder fontSize="medium" style={{ color: "#FF4081" }} />
            )}
          </IconButton>
        </CardActions>
      </StyledCard>
    </Grid>
  );
}

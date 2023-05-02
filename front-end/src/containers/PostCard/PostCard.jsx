import React, {useState} from "react";
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
  Badge,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import {Favorite, FavoriteBorder} from "@mui/icons-material";
import axios from "axios";
import * as Util from "../../util/Util.mjs";
import * as Logger from "../../util/Logger.mjs";

//styled the card
const StyledCard = styled(Card)({
  borderRadius: "15px",
});

const StyledPostTitle = styled(Typography)({
  display: "flex",
  fontWeight: "bold",
});

const StyledPostDate = styled(Typography)({
  display: "flex",
  color: "text.secondary",
});

const StyledLikesContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  bgcolor: "#ab2d25",
  borderRadius: "8px",
  color: "#fff",
  width: "fit-content",
  height: "40px",
  padding: "0px 12px",
});

const StyledLikesCount = styled(Typography)({
  display: "flex",
  marginLeft: "5px",
  marginRight: "12px",
});

const StyledLikeIcon = styled(FavoriteBorderIcon)({
  color: "#f44336",
  fontSize: "20px",
});

export default function PostCard(props) {
  const { postId, post } = props;
  const [isSaved, setIsSaved] = useState(post["isSaved"]??false);
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/post/view/${postId ?? "0"}`); //TODO: replace with error message if postID is not provided
  };

  const handleOnSave = () => {
    axios
        .post(Util.getServerAddr() + `/post/save`, {
          token: Util.readLocalValue("token") ?? 12345,
          mock: "false",
          postId: postId,
          isSaved: !isSaved,
        })
        .then((response) => {
          Logger.info(JSON.stringify(response.data));
        })
        .catch((err) => {
          Logger.error(err);
        });

    setIsSaved(!isSaved);
  };

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
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <StyledPostTitle variant="h6" align="left">
                {post.title}
              </StyledPostTitle>
              <StyledPostDate variant="caption">
                {post.createTime?.slice(0, 10)}
              </StyledPostDate>
            </Box>
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
            //align: "space-evenly"
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
            Expand
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

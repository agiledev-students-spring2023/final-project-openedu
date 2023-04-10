import React from "react";
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

import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";

const StyledCard = styled(Card)({
  borderRadius: "15px",
});

const StyledFeedTitle = styled(Typography)({
  display: "flex",
  fontWeight: "bold",
});

const StyledFeedDate = styled(Typography)({
  display: "flex",
  color: "text.secondary",
});

export default function FeedbackCard(props) {
  const { feedId, feed } = props;
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/post/view/${feedId ?? "0"}`); //TODO: replace with error message if feedID is not provided
  };

  return (
    <Grid item xs={12} md={6} lg={4} sx={{ paddingTop: "20px" }}>
      <StyledCard>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <StyledFeedTitle variant="h6">{feed.title}</StyledFeedTitle>
              <StyledFeedDate variant="caption">
                {feed.date.slice(0, 10)}
              </StyledFeedDate>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Box sx={{ display: "flex", marginLeft: "10px" }}>
                <Badge badgeContent={feed.comments} color="primary">
                  <IconButton size="small">
                    <ModeCommentOutlinedIcon color="inherit" fontSize="small" />
                  </IconButton>
                </Badge>
              </Box>
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
            sx={{
              display: "flex",
              marginTop: "4px",
            }}
          >
            {feed.overview}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            size="small"
            onClick={handleReadMore}
            sx={{
              backgroundColor: "primary.main",
              color: "#fff",
              width: "50%",
              padding: "6px 12px",
              borderRadius: "8px",
              transition: "background-color 0.3s ease-in-out",
              "&:hover": {
                backgroundColor: "#212d61",
              },
            }}
          >
            Review your feedback
          </Button>
        </CardActions>
      </StyledCard>
    </Grid>
  );
}

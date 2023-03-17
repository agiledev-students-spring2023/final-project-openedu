import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import { Button, CardContent, Typography } from "@mui/material";

function SubjectCards(
  /** @type {{ entry: { id: number; name: string; description: string; completionRate: number; } }} */
  { entry }
) {
  const navigate = useNavigate();
  const routeChange = () => {
    navigate(`./index-SubjectDetail/${entry.id}`);
  };

  return (
    <Card sx={{ minWidth: 200 }}>
      <CardContent>
        <Typography variant="h4" component="div">
          {entry.name ?? "Subject Name"}
        </Typography>
        <Typography variant="body1" component="div">
          {entry.description ?? "Subject Description"}
        </Typography>
        <Typography variant="caption" component="div">
          CompletionRate: {entry.completionRate ?? 0}
        </Typography>
        <Button variant="contained" onClick={routeChange}>
          Learn More
        </Button>
      </CardContent>
    </Card>
  );
}

export default SubjectCards;

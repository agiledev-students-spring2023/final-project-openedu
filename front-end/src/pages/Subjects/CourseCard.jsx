import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {Button, Card, CardContent, Typography} from "@mui/material";

export function CourseCard(
  /** @type {{ entry: { id: number; name: string; description: string; completionRate: number; } }} */
  { entry }
) {
  const navigate = useNavigate();
  const routeChange = () => {
    navigate("../course/CourseDetail/${entry.id}");
  };
  return (
    <Card
      sx={{
        minWidth: 200,
      }}
    >
      <CardContent>
        <Typography variant="h4" component="div">
          {entry.name ?? "Course Name"}
        </Typography>
        <Typography variant="body1" component="div">
          {entry.description ?? "Course Description"}
        </Typography>
        <Typography variant="caption" component="div">
          CompletionRate: {entry.completionRate ?? 0}
        </Typography>
        <Button variant="outlined" onClick={routeChange}>
          Learn More
        </Button>
      </CardContent>
    </Card>
  );
}
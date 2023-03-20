import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {Button, Card, Grid,CardContent, Typography} from "@mui/material";
import * as Constants from "../../util/Constants.mjs";

export function CourseCard(
    /** @type {{ entry: { id: number; name: string; description: string; completionRate: number; } }} */
    { entry }
) {
    const navigate = useNavigate();
    const routeChange = () => {
        navigate("../course/CourseDetail/${entry.id}");
    };
    return (
        <Grid
            sx={{
                minWidth: 200,
                margin: Constants.UI_HORIZ_OFFSET,
                padding: Constants.UI_CORNER_RADIUS/4,
                borderRadius: Constants.UI_CORNER_RADIUS
            }}>
            <Card>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {entry.name ?? "Course Name"}
                    </Typography>
                    <Typography variant="body" component="div">
                        {entry.description ?? "Course Description"}
                    </Typography>
                    <Typography variant="caption" component="div">
                        CompletionRate: {entry.completionRate ?? 0}
                    </Typography>
                    <Button variant="contained" onClick={routeChange}>
                        Learn More
                    </Button>
                </CardContent>
        </Card>
        </Grid>
    );
}

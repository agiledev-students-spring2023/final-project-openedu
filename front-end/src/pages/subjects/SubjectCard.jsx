import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Card,
    Collapse,
    Box,
    Button,
    CardContent,
    CardMedia,
    Grid,
    LinearProgress,
    Typography,
    useTheme,
} from "@mui/material";
import * as Constants from "../../util/Constants.mjs";
import * as PropTypes from "prop-types";

function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ width: "100%", mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
};
export function SubjectCard(
    /** @type {{ entry: { id: number; name: string; description: string; completionRate: number; } }} */
    { entry }
) {
    const navigate = useNavigate();
    const theme = useTheme();
    const routeChange = () => {
        navigate(`../detail/${entry.subjectId}`);
    };
    const [isExpanded, setIsExpanded] = useState(false);

    const handleExpandClick = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <Grid
            sx={{
                padding: Constants.UI_CORNER_RADIUS / 4,
                borderRadius: Constants.UI_CORNER_RADIUS * 8,
                marginBottom: 2,
            }}
        >
            <Card
                sx={{
                    marginBottom: 2,
                }}
            >
                <CardContent>
                    <CardMedia
                        sx={{
                            borderRadius: Constants.UI_HORIZ_OFFSET / 2,
                        }}
                        id={entry.subjectId ?? 0}
                        component="img"
                        height="140"
                        image={entry.imageUrl ?? "Subject Image"}
                    />
                    <Typography
                        variant="h5"
                        component="div"
                        sx={{
                            marginTop: "1vh",
                            fontWeight: "semi-bold",
                        }}
                    >
                        {entry.name ?? "Subject Name"}
                    </Typography>

                    <Collapse in={isExpanded} timeout="auto" collapsedSize={70}>
                        <Typography
                            variant="body"
                            color="text.secondary"
                            align="left"
                            sx={{
                                display: "flex",
                                marginTop: "4px",
                            }}
                        >
                            {entry.description}
                        </Typography>
                    </Collapse>
                    <Button
                        variant="outlined"
                        onClick={handleExpandClick}
                        size="small"
                        sx={{
                            position: "relative",
                            right: "-35%",
                            color: "white",
                            marginTop: "1vh",
                            backgroundColor: theme.palette.neutral.main,
                        }}
                    >
                        {isExpanded ? "Collapse" : "Read more"}
                    </Button>

                    <Box
                        sx={{
                            display: "Grid",
                            marginTop: '20px'
                        }}
                    >
                        <Button variant="contained" onClick={routeChange}>
                            Learn More
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    );
}

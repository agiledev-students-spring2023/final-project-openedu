import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Button,
    Card,
    Grid,
    CardContent,
    Typography,
    Box,
    CardMedia,
    LinearProgress,
    Collapse
} from "@mui/material";
import * as Constants from "../../util/Constants.mjs";
import * as PropTypes from "prop-types";

//need fix during Sprint3,
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

export function CourseCard({ entry }) {
    const navigate = useNavigate();
    const [isExpanded, setIsExpanded] = useState(false);
    const routeChange = () => {
        navigate(`/courses/detail/${entry.courseId}`);
    };
    return (
        <Grid
            sx={{
                // minWidth: 200,
                // margin: Constants.UI_HORIZ_OFFSET,
                paddingY: Constants.UI_CORNER_RADIUS / 4,
                borderRadius: Constants.UI_CORNER_RADIUS * 2,
                marginBottom: 2,
            }}
        >
            <Card>
                <CardContent>
                    <CardMedia
                        sx={{
                            borderRadius: Constants.UI_HORIZ_OFFSET,
                        }}
                        component="img"
                        height="140"
                        image={entry.imageUrl ?? "Course Image"}
                        alt={entry.name}
                    />
                    <Typography variant="h5" component="div" sx={{ textAlign: 'left' }}>
                        {entry.name ?? "Course Name"}
                    </Typography>
                    <Collapse in={isExpanded} timeout="auto" collapsedSize={70}>
                        <Typography variant="body" color="text.secondary" align="left"
                            sx={{
                                display: "flex",
                                marginTop: "4px",
                            }}>
                            {entry.description}
                        </Typography>
                    </Collapse>
                    <Button
                        variant="outlined"
                        onClick={() => setIsExpanded(!isExpanded)}
                        size="small"
                        sx={{
                            position: 'relative',
                            right: '-35%',
                            color: 'white',
                            marginTop: "1vh",
                        }}>
                        {isExpanded ? 'Collapse' : 'Read more'}
                    </Button>
                    {/*<Typography variant="caption" component="div">*/}
                    {/*  CompletionRate: {entry.completionRate ?? 0}*/}
                    {/*</Typography>*/}
                    <Box
                        sx={{
                            display: "Grid",
                        }}
                    >
                        <Box
                            sx={{
                                width: "100%",
                            }}
                        >
                            <LinearProgressWithLabel
                                value={entry.completionRate ?? 0}
                                component="div"
                            />
                        </Box>
                        <Button variant="contained" component="div" onClick={routeChange}>
                            Continue
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    );
    const navigate = useNavigate();
    const [isExpanded, setIsExpanded] = useState(false);
    const routeChange = () => {
        navigate(`/courses/detail/${entry.courseId}`);
    };
    return (
        <Grid
            sx={{
                // minWidth: 200,
                // margin: Constants.UI_HORIZ_OFFSET,
                paddingY: Constants.UI_CORNER_RADIUS / 4,
                borderRadius: Constants.UI_CORNER_RADIUS * 2,
                marginBottom: 2,
            }}
        >
            <Card>
                <CardContent>
                    <CardMedia
                        sx={{
                            borderRadius: Constants.UI_HORIZ_OFFSET,
                        }}
                        component="img"
                        height="140"
                        image={entry.imageUrl ?? "Course Image"}
                        alt={entry.name}
                    />
                    <Typography variant="h5" component="div" sx={{ textAlign: 'left' }}>
                        {entry.name ?? "Course Name"}
                    </Typography>
                    <Collapse in={isExpanded} timeout="auto" collapsedSize={70}>
                        <Typography variant="body" color="text.secondary" align="left"
                            sx={{
                                display: "flex",
                                marginTop: "4px",
                            }}>
                            {entry.description}
                        </Typography>
                    </Collapse>
                    <Button
                        variant="outlined"
                        onClick={() => setIsExpanded(!isExpanded)}
                        size="small"
                        sx={{
                            position: 'relative',
                            right: '-35%',
                            color: 'white',
                            marginTop: "1vh",
                        }}>
                        {isExpanded ? 'Collapse' : 'Read more'}
                    </Button>
                    <Box
                        sx={{
                            display: "Grid",
                            marginTop: '20px'
                        }}
                    >
                        <Button variant="contained" component="div" onClick={routeChange}>
                            Continue
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    );
}

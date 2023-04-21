import { Box, Button, Grid, ToggleButton, ToggleButtonGroup, Typography, } from "@mui/material";
import { CreateOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import BackgroundImage from "../../containers/BackgroundImage";
import { useNavigate } from "react-router-dom";
import CourseCard from "../../containers/CourseCard/CourseCardAtHome";
import * as Util from "../../util/Util.mjs";
import axios from "axios";
import * as Logger from "../../util/Logger.mjs";

//Todo: add link to each card to courseDetail page.

function CourseTypeToggleButton({ value, onChange }) {
    return (
        <ToggleButtonGroup
            value={value}
            exclusive
            onChange={onChange}
            aria-label="Platform"
            align="center"
            sx={{
                marginLeft: "5%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
            }}
        >
            <ToggleButton value="Recent">Recent</ToggleButton>
            <ToggleButton value="Suggestion">Suggesstion</ToggleButton>
        </ToggleButtonGroup>
    );
}


const CourseSlide = ({ data }) => {
    const navigate = useNavigate();
    const handleCardClick = (entry) => {

        console.log("card clicked", entry);

        //navigate to subject detail page
        const path = `/subjects/detail/${entry.subjectId}`;

        navigate(path);

    };

    return (
        <Box
            sx={{
                marginTop: "5%",
                marginLeft: "2.3vh",
                display: "flex",
                justifyContent: "center",
                marginRight: "2.3vh",
            }}
        >
            <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 6, sm: 8, md: 12 }}
            >
                {data.slice(0, 6).map((entry, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index} onClick={() => handleCardClick(entry)}>
                        <CourseCard key={index} entry={entry} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export function Home(props) {

    const navigate = useNavigate();

    const [alignment, setAlignment] = React.useState("Recent");
    const [data, setData] = useState([]);
    const [profile, setProfile] = useState(undefined);
    const [isLoaded, setLoaded] = useState(false);

    console.log(data);

    //this is for the toggle button, handle the source of the course slides
    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    //this is for the onClick source of the course slides. It links to the course detail page
    const handleClick = () => {
        if (alignment === "Recent") {
            navigate("/subjects/recent");

            console.log("recent clicked");

        } else if (alignment === "Suggestion") {
            navigate("/subject/recommend");

            console.log("suggestion clicked");

        }
    };


    useEffect(() => {

        axios.get(Util.getServerAddr() +
            `/profile/info?token=1234`).then((response) => {

                Logger.info(`SubjectList's axios got the following data: \n ${response.data}`);
                setProfile(response.data["content"]);
            });


        if (alignment === "Recent") {

            // get course slide data about recent course

            console.log("fetching course information");
            axios
                .get(
                    Util.getServerAddr() +
                    `/subject/previous?token=1234`
                )
                .then((response) => {
                    Logger.info(`SubjectList's axios got the following data: \n ${response.data}`);
                    setData(response.data["content"]);

                    setLoaded(true);
                })
                .catch((err) => {
                    Logger.error("error fetching subject information");
                    Logger.error(err);

                    //const backupData =
                    setData([
                        {
                            id: 3,
                            name: "backupRecentSubject",
                            description: "backupRecentDescription",
                            completionRate: 37,
                        },
                    ]);

                    setLoaded(true);
                });

        } else if (alignment === "Suggestion") {

            // get course slide data about recommended course

            console.log("fetching subject information");
            axios
                .get(
                    Util.getServerAddr() +
                    `/subject/recommend?token=1234`
                )
                .then((response) => {
                    Logger.info(
                        `SubjectList's axios got the following data: \n ${response.data}`
                    );
                    setData(response.data["content"]);

                    setLoaded(true);
                })
                .catch((err) => {
                    Logger.error("error fetching subject information");
                    Logger.error(err);

                    //const backupData =
                    setData([
                        {
                            id: 3,
                            name: "backupSubject",
                            description: "backupDescription",
                            completionRate: 37,
                        },
                    ]);

                    setLoaded(true);
                });
        }
    }, [alignment]);

    return (
        <Box>
            <BackgroundImage />
            <Box>
                <Box
                    className="welcome_line"
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: 1,
                        alignItems: "center",
                        marginTop: "20vh",
                        marginBottom: "6vh",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            marginLeft: "5%",
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                fontFamily: "Raleway",
                                display: "flex",
                                fontSize: "40px",
                            }}
                        >
                            Welcome
                        </Typography>
                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: "900",
                                display: "flex",
                                fontSize: "35px",
                            }}
                        >
                            {(profile ?? {})["name"] ?? "UserName"}
                        </Typography>
                    </Box>

                    {/*profile edit button*/}
                    <Button
                        onClick={() => {
                            navigate("/profile/edit");
                        }}
                    >
                        <CreateOutlined
                            sx={{
                                display: "flex",
                                marginRight: "5%",
                                color: "text.primary",
                            }}
                        />
                    </Button>
                </Box>
            </Box>

            <Box
                className="tabs"
                sx={{
                    borderRadius: "24px",
                    backgroundColor: "background.default",
                    position: "absolute",
                    left: "0",
                    width: "1",
                    display: "flex",
                    flexDirection: "column",
                    paddingBottom: "5vh",
                }}
            >
                <Box
                    className="recent"
                    color="primary"
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: "5%",
                        marginLeft: "2.3vh",
                    }}
                >
                    <Box
                        sx={{
                            margin: "auto",
                        }}
                    >
                        <CourseTypeToggleButton value={alignment} onChange={handleChange} />
                    </Box>
                </Box>

                <CourseSlide data={data} className="courseCards" />

                <Box
                    sx={{
                        display: "flex",
                        margin: "auto",
                        marginTop: "5%",
                    }}
                >
                    <Button variant="contained" size="small" value={alignment} onClick={handleClick}>Learn More</Button>
                </Box>
            </Box>
        </Box>
    );
}

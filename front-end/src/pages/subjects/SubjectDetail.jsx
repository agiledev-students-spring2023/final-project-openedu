import React, { useEffect, useState } from "react";
import { CourseCard } from "./CourseCard.jsx";
import axios from "axios";
import ClassIcon from "@mui/icons-material/Class";
import { Typography, CardMedia, Box, Button, Collapse, useTheme } from "@mui/material";
import { TypeAnimation } from "react-type-animation";
import * as Logger from "../../util/Logger.mjs";
import * as Constants from "../../util/Constants.mjs";
import * as Util from "../../util/Util.mjs";
import {useNavigate, useParams} from "react-router-dom";
import { BackButton } from "../../containers/BackButton/BackButton";

export function SubjectDetail() {
    const [subject, setSubject] = useState(null);
    const [courses, setCourses] = useState([]);
    const [isLoaded, setLoaded] = useState(false);

    const { subjectId } = useParams();
    const theme = useTheme();
    const url = Util.getServerAddr() + "/subject/detail";

    Logger.verbose("URL: " + url);

    useEffect(() => {

        Util.invokeCallback("setNewPage", 1);

        Logger.info("fetching course information");
        axios(url, {
            params: {
                subjectId: subjectId,
                mock: "false"
            }
        })
            .then((response) => {

        //Logger.info(JSON.stringify(response.data["content"]));

        if (response.data["status"] !== 0) {
          Logger.info(response.data["status"]);
          Util.onAuthError(useNavigate()).then(r => true);
          return;
        }

        setCourses(response.data["content"].courses);
        setSubject(response.data["content"]);
        setLoaded(true);

            })
            .catch((err) => {
                Logger.error("error fetching subject information");
                Logger.error(err);

                setSubject([
                    {
                        courseId: 3,
                        avatar: ClassIcon,
                        name: "backupSubject",
                        description: "backupDescription",
                        completionRate: 37,
                    },
                ]);
                setLoaded(true);

            });
    }, []);
    const [isExpanded, setIsExpanded] = useState(false);



    return (
        <>
            <BackButton />

            {isLoaded ? (
                <Box
                    sx={{
                        margin: Constants.UI_HORIZ_OFFSET,
                    }}
                >
                    {/*Course Image*/}
                    <CardMedia
                        alt="course_image"
                        image={subject.imageUrl ?? ""}
                        sx={{
                            height: 300,
                            borderRadius: Constants.UI_CORNER_RADIUS,
                        }}
                    />
                    <Box
                        sx={{
                            marginY: 3,
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                // margin: Constants.UI_HORIZ_OFFSET,
                                textAlign: "left",
                                fontWeight: "bold",
                                // fontFamily: 'Roboto',
                                letterSpacing: 2,
                                //color: "text.primary",
                            }}
                        >
                            {subject.name}
                        </Typography>
                        <Collapse in={isExpanded} timeout="auto" collapsedSize={70}>
                            <Typography variant="body" color="text.secondary" align="left"
                                sx={{
                                    display: "flex",
                                    marginTop: "4px",
                                }}>
                                {subject.description}
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

                    </Box>

                    {courses.map((entry, index) => (
                        <CourseCard key={index} entry={entry} />
                    ))}
                </Box >
            ) : (
                <></>
            )
            }
        </>
    );
}

import React, { useEffect, useState } from "react";
import CourseCards from "./subjectDetail";
import axios from "axios";
import { useParams } from "react-router-dom";
import ClassIcon from "@mui/icons-material/Class";
import { Typography } from "@mui/material";

export default function Courses(props) {
    const url = ""; //add API URL

    const [data, setData] = useState([]);
    const [isLoaded, setLoaded] = useState(false);
    const subjectId = props["subjectId"] ?? 0;

    useEffect(() => {
        console.log("fetching course information");
        axios(url)
            .then((response) => {
                setData(response.data);
            })
            .catch((err) => {
                console.log("error fetching subject information");
                console.log(err);

                setData([
                    {
                        id: 3,
                        avatar: ClassIcon,
                        name: "backupSubject",
                        description: "backupDescription",
                        completionRate: 37,
                    },
                ]);

                setLoaded(true);
                // const backupData = [
                //   {
                //     id: 3,
                //     avatar: ClassIcon,
                //     name: "backupSubject",
                //     description: "backupDescription",
                //     completionRate: 37,
                //   },
                // ];
                // setData((backupData ?? [])[0]);
            });
    }, []);

    return (
        <>
            <Typography variant="h1">{subjectId.name}</Typography>
            <Typography variant="h6"> {subjectId.description}</Typography>
            <Typography variant="h6">
                What course would you like to learn today?
            </Typography>
            {data.map((entry, index) => (
                <CourseCards key={index} {...entry} />
            ))}
        </>
    );
}

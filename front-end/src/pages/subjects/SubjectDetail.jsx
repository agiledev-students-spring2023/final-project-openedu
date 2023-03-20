import React, { useEffect, useState } from "react";
import { CourseCard } from "./CourseCard.jsx";
import axios from "axios";
import ClassIcon from "@mui/icons-material/Class";
import { Typography } from "@mui/material";
import * as Mockaroo from "../../mockApi/apis.mjs";
import {TypeAnimation} from "react-type-animation";



export function SubjectDetail(props) {

    const url = Mockaroo.mockDataApi(`subjects`);
    // const url = Mockaroo.mockDataApi(`subjects/${subjectId}`);


    const [data, setData] = useState([]);
    const [isLoaded, setLoaded] = useState(false);

    const subjectId = props["subjectId"] ?? 0;

    useEffect(() => {
        console.log("fetching course information");
        axios(url)
            .then((response) => {
                setData(response.data);
                setLoaded(true);
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
            <Typography variant="h1">Courses</Typography>
            <Typography variant="h2">{subjectId.name}</Typography>
            <Typography variant="h6"> {subjectId.description}</Typography>
            {/*<Typography variant="body">*/}
            {/*    Which course would you like to learn today?*/}
            {/*</Typography>*/}
            <TypeAnimation
                sequence={[
                    'Which course would you like to learn today?', // Types 'One'
                    1000, // Waits 1s
                    'Pick one that interests you!',
                    2000,

                    () => {
                        console.log('Sequence completed'); // Place optional callbacks anywhere in the array
                    }
                ]}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
                style={{ fontSize: '1em', display: 'inline-block' }}
            />
            {data.map((entry, index) => (
                <CourseCard key={index} entry={entry} />
            ))}
        </>
    );
}

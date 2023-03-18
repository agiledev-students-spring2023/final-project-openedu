import React, { useEffect, useState } from "react";
import SubjectCards from "./subjectCard";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

export default function Subjects() {
    const url = "https://my.api.mockaroo.com/${subjects}?key=${33866960}"; //Add API URL

    const [data, setData] = useState([]);
    const [isLoaded, setLoaded] = useState(false);

    const navigate = useNavigate();

    const subjectId = useParams();

    useEffect(() => {
        console.log("fetching subject information");
        axios(url)
            .then((response) => {
                setData(response.data);
            })
            .catch((err) => {
                console.log("error fetching subject information");
                console.log(err);

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
                //setData((backupData??[])[0])
            });
    }, []);

    return (
        <>
            <Typography variant="h1">Subjects</Typography>
            <Typography variant="h6">What would you like to learn today?</Typography>
            {isLoaded ? (
                data.map((entry) => <SubjectCards key={entry.id} entry={entry} />)
            ) : (
                <div />
            )}
        </>
    );
}

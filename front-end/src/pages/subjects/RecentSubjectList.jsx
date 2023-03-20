import React, { useEffect, useState } from "react";
import { SubjectCard } from "./SubjectCard";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import * as Mockaroo from "../../mockApi/apis.mjs";


export function RecentSubjectList() {

    const url = Mockaroo.mockDataApi("subjects"); //change api to recent subjects

    const [data, setData] = useState([]);
    const [isLoaded, setLoaded] = useState(false);

    const navigate = useNavigate();

    const subjectId = useParams();

    useEffect(() => {
        console.log('fetching subject information');
        axios(url)
            .then(response => {
                setData(response.data);
                setLoaded(true);
            })
            .catch(err => {
                console.log('error fetching subject information');
                console.log(err);

                //const backupData =
                setData([
                    {
                        id: 3,
                        name: 'backupRecentSubject',
                        description: 'backupRecentDescription',
                        completionRate: 37,
                    }
                ]);

                setLoaded(true);
                //setData((backupData??[])[0])
            });
    }, []);

    return (
        <>
            <h1>Recent Subjects</h1>
            <p>What would you like to learn today?</p>
            {isLoaded ? (
                data.map((entry) => <SubjectCard key={entry.id} entry={entry} />)
            ) : (
                <div />
            )}
        </>
    );
}


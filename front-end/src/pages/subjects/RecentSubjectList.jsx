import React, { useEffect, useState } from 'react';
import {SubjectCard} from './SubjectCard';
import axios from "axios";
import { useParams } from "react-router-dom";


export function RecentSubjectList() {

    const url = '';

    const [data, setData] = useState([]);
    const [isLoaded, setLoaded] = useState(false);
    // const [name, setName] = useState("");
    // const [description, setDescription] = useState("");
    // const [completionRate, setCompletionRate] = useState([]);

    const subjectId = useParams();

    useEffect(() => {
        console.log('fetching subject information');
        axios(url)
            .then(response => {
                setData(response.data);
            })
            .catch(err => {
                console.log('error fetching subject information');
                console.log(err);

                //const backupData =
                setData([
                    {
                        id: 3,
                        name: 'backupSubject',
                        description: 'backupDescription',
                        completionRate: 37,
                    }
                ]);

                setLoaded(true);
                //setData((backupData??[])[0])
            });
    }, []);

    return (
        <>
            <div>Subjects should be implemented here</div>
            <h1>Recent</h1>
            <p>What would you like to learn today?</p>
            {data.map((entry, index) => (
                <SubjectCard key={index} {...entry} />
            ))}
        </>
    );
}


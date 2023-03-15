import React, { useEffect, useState } from 'react';
import SubjectCards from './subject';
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";



export default function Subjects() {

  const url = '';

  const [data, setData] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

  const navigate = useNavigate();

  const subjectId  = useParams();

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
      <h1>Subjects</h1>
      <p>What would you like to learn today?</p>
      {isLoaded ?
        data.map((entry) => (
          <SubjectCards key={entry.id} entry={entry} />
        )
        ) : <div />}
    </>
  );
}
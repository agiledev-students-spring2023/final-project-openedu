import React, { useEffect, useState } from "react";
import { SubjectCard } from "./SubjectCard";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import * as Mockaroo from "../../mockApi/apis.mjs";

export function SubjectList() {
  const url = Mockaroo.mockDataApi("subjects"); //Add API URL

  const [data, setData] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

  const navigate = useNavigate();

  const subjectId = useParams();

  useEffect(() => {
    console.log("fetching subject information");
    axios.get(url)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
        setLoaded(true);
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
      // .finally(() => {
      //   setLoaded(true);
      // })
  }, []);

  return (
    <>
      <Typography variant="h1">Subjects</Typography>
      <Typography variant="h6">What would you like to learn today?</Typography>
      {isLoaded ? (
        data.map((entry) => <SubjectCard key={entry.id} entry={entry} />)
      ) : (
        <div />
      )}
    </>
  );
}

import React, { useEffect, useState } from "react";
import { SubjectCard } from "./SubjectCard";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import * as Mockaroo from "../../mockApi/apis.mjs";
import * as Constants from "../../util/Constants.mjs";
import { TypeAnimation } from "react-type-animation";
import * as Logger from "../../util/Logger.mjs";

export function SuggestSubjectList() {
  const url = Mockaroo.mockDataApi("subjects"); //Add API URL

  const [data, setData] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

  const navigate = useNavigate();
  const subjectId = useParams();

  useEffect(() => {
    console.log("fetching subject information");
    axios(url)
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
            name: "backupSuggestedSubject",
            description: "backupSuggestedDescription",
            completionRate: 37,
          },
        ]);

        setLoaded(true);
        //setData((backupData??[])[0])
      });
  }, []);

  return (
    <Box
      sx={{
        marginX: Constants.UI_HORIZ_OFFSET,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          //textAlign: 'left',
          marginTop: 1,
          fontWeight: "semi-bold",
        }}
      >
        You May Like
      </Typography>
      {/*<Typography variant="h6">What would you like to learn today?</Typography>*/}

      <Box
        sx={{
          marginBottom: 3,
        }}
      >
        <TypeAnimation
          sequence={[
            "What would you like to learn today?", // Types 'One'
            1000, // Waits 1s
            "Pick one that interests you!",
            2000,
            "Pick a Subject, take a look at it!",
            3000,

            async () => {
              Logger.verbose("SubjectList: Typewriter Sequence completed"); // Place optional callbacks anywhere in the array
            },
          ]}
          wrapper="span"
          cursor={true}
          repeat={1}
          sx={{ fontSize: "1em", display: "inline-block" }}
        />
      </Box>

      {isLoaded ? (
        data.map((entry) => <SubjectCard key={entry.id} entry={entry} />)
      ) : (
        <div />
      )}
    </Box>
  );
}

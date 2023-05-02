import React, {useEffect, useState} from "react";
import {SubjectCard} from "./SubjectCard";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Box, Typography} from "@mui/material";
import {TypeAnimation} from "react-type-animation";
import * as Logger from "../../util/Logger.mjs";
import * as Util from "../../util/Util.mjs";

export function SubjectList() {
    const url = Util.getServerAddr() + "/subject/list";

    const [data, setData] = useState([]);
    const [isLoaded, setLoaded] = useState(false);

    useEffect(() => {

        Util.invokeCallback("setNewPage", 1);

        console.log("fetching subject information");
        axios
            .get(url, {
                params: {
                    mock: "false"
                }
            })
            .then((response) => {
                Logger.info(
                    `SubjectList's axios got the following data: \n ${response.data}`
                );

                if (response.data["status"] !== 0) {
                    Logger.info(response.data["status"]);
                    Util.onAuthError(useNavigate()).then(r => true);
                    return;
                }

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
                //setData((backupData??[])[0])
            });
    }, []);

    return (
        <Box
            sx={
                {
                    //marginX: Constants.UI_HORIZ_OFFSET,
                }
            }
        >
            <Typography
                variant="h4"
                sx={{
                    //textAlign: 'left',
                    marginTop: 1,
                    fontWeight: "semi-bold",
                }}
            >
                Subjects
            </Typography>

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
                    sx={{fontSize: "1em", display: "inline-block"}}
                />
            </Box>

            {isLoaded ? (
                data.map((entry) => <SubjectCard key={entry.subjectId} entry={entry}/>)
            ) : (
                <div/>
            )}
        </Box>
    );
}

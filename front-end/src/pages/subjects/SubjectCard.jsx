import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import Card from '@mui/material/Card';
import {Button, CardContent, Grid, Typography, useTheme} from "@mui/material";
import * as Constants from "../../util/Constants.mjs";

export function SubjectCard(
    /** @type {{ entry: { id: number; name: string; description: string; completionRate: number; } }} */
    { entry }
) {
    const navigate = useNavigate();
    const theme = useTheme();
    const routeChange = () => {
        navigate(`./subject_detail/${entry.id}`);
    };

    return (
        // <div className='SubjectCards'>
        //     <h1> {props.name??"a"}</h1>
        //     <p> {props.description??"a"}</p>
        //     <p> You have completed {props.completionRate??0} % </p>
        // </div>
        <Grid
            sx={{
                minWidth: 200,
                margin: Constants.UI_HORIZ_OFFSET,
                padding: Constants.UI_CORNER_RADIUS/4,
                borderRadius: Constants.UI_CORNER_RADIUS
            }}>
            <Card>
                <CardContent>
                    <Typography variant='h5' component='div'>
                        {entry.name??'Subject Name'}
                    </Typography>
                    <Typography variant='body' component='div'>
                        {entry.description??"Subject Description"}
                    </Typography>
                    <Typography variant='subtitle' component='div'>
                        CompletionRate: {entry.completionRate??0}
                    </Typography>
                    <Button variant='contained' onClick={routeChange}>
                        Learn More
                    </Button>
                </CardContent>
            </Card>
        </Grid>
    );
}
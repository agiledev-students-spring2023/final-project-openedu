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
        navigate(`../detail/${entry.id}`);
    };

    return (
            <Card sx={{
                marginBottom: 2
            }}>
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
        // </Grid>
    );
}
import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {Button, CardContent, Typography} from "@mui/material";
import Card from "@mui/material/Card";


function CourseCards(
    /** @type {{ entry: { id: number; name: string; description: string; completionRate: number; } }} */
    { entry }
) {
    const navigate = useNavigate();
    const routeChange = () => {
        navigate('../courses/CourseDetail/${entry.id}');
    };
    return (

        <Card sx={{minWidth:200}}>
            <CardContent>
                <Typography variant='h5' component='div'>
                    {props.name??'Course Name'}
                </Typography>
                <Typography variant='body' component='div'>
                    {props.description??"Course Description"}
                </Typography>
                <Typography variant='subtitle' component='div'>
                    CompletionRate: {props.completionRate??0}
                </Typography>
                <Button variant="outlined" onClick={routeChange}>Learn More</Button>
            </CardContent>
        </Card>
    );
}


export default CourseCards;

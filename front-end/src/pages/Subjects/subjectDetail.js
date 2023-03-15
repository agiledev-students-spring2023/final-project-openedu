import React, {useState, useEffect} from 'react';
import {CardContent, Typography} from "@mui/material";
import Card from "@mui/material/Card";


function CourseCards(props) {

    return (
        // <div className='CourseCards'>
        //     <h1> {props.name}</h1>
        //     <p> {props.description}</p>
        //     <p> You have completed {props.completionRate} % </p>
        // </div>
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
            </CardContent>
        </Card>
    );
}


export default CourseCards

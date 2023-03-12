import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Card from '@mui/material/Card'
import {CardContent, Typography} from "@mui/material";

function SubjectCards(props) {

    return (
        // <div className='SubjectCards'>
        //     <h1> {props.name??"a"}</h1>
        //     <p> {props.description??"a"}</p>
        //     <p> You have completed {props.completionRate??0} % </p>
        // </div>
        <Card sx={{minWidth:200}}>
            <CardContent>
                <Typography variant='h1' component='div'>
                    {props.name??'a'}
                </Typography>
                <Typography variant='h5' component='div'>
                    {props.description??"a"}
                </Typography>
                <Typography variant='h6' component='div'>
                    CompletionRate: {props.completionRate??0}
                </Typography>
            </CardContent>
        </Card>
    );
}


export default SubjectCards

import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';

function SubjectCards(props) {

    return (
        <div className='SubjectCards'>
            <h1> {props.name}</h1>
            <p> {props.description}</p>
            <p> You have completed {props.completionRate} % </p>
        </div>
    );
}


export default SubjectCards

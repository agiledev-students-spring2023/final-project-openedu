import React, {useState, useEffect} from 'react';


function CourseCards(props) {

    return (
        <div className='CourseCards'>
            <h1> {props.name}</h1>
            <p> {props.description}</p>
            <p> You have completed {props.completionRate} % </p>
        </div>
    );
}


export default CourseCards

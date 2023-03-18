import React, {useEffect, useState} from "react";

export const CourseList = props => {

    //TODO: Put useState here
    const [courses,setCourse] = useState([]);
    const [isLoaded,setLoaded] = useState(false);

    useEffect(() => {

        //TODO: fetch data with actual stuff

        setCourse( [
            {
                name: "Java",
                description: "Ipsum Lorem",
                completion: 0.55,
                courseId: 0
            },
            {
                name: "Flutter",
                description: "Waaaa",
                completion: 0.7,
                courseId: 1
            },
            {
                name: "JavaScript",
                description: "LOL",
                completion: 0.8,
                courseId: 2
            }

        ]);

    },[]);

    return <>

    </>;
};
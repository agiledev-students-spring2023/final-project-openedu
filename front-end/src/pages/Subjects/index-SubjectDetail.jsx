import React, {useEffect, useState} from 'react'
import CourseCards from './courseDetail'
import axios from "axios";
import {useParams} from "react-router-dom";
import ClassIcon from '@mui/icons-material/Class';



export default function Courses(props) {

    const url = ''

    const [data, setData] = useState([]);
    const [isLoaded, setLoaded] = useState(false);
    // const [name, setName] = useState("");
    // const [description, setDescription] = useState("");
    // const [completionRate, setCompletionRate] = useState([]);
    let subjectId = props["subjectId"]??0;

    useEffect(() => {
        console.log('fetching course information')
        axios(url)
            .then(response => {
                setData(response.data)
            })
            .catch(err => {
                console.log('error fetching subject information')
                console.log(err)

                const backupData = [
                    {
                        id: 3,
                        avatar: ClassIcon,
                        name: 'backupSubject',
                        description: 'backupDescription',
                        completionRate: 37,
                    }
                ]
                setData((backupData??[])[0]);
            })
    }, [])

    return (
    <>
      <div></div>
      <h1>{subjectId.name}</h1>
      <p>{subjectId.description}</p>
      <p>What course would you like to learn today?</p>
      {data.map(entry => (
        <CourseCards {'pass data to single card'} />
      ))}
    </>
  )
}

import {React,useState} from "react";
import {Divider} from "@mui/material";
import {CommentCard} from "./CommentCard";

export const CourseDetail = props => {

    //TODO: Put useState here
    const [courseInfo,setCourseInfo] = useState(undefined);
    const [comments, setComments] = useState(undefined);
    const [isLoaded, setLoaded] = useState(false);

    useState(() => {

        //TODO: Fetch actual data, use props.courseId

        setCourseInfo({
            courseId: 0,
            name: "foo",
            detail: "ipsum_lorem",
            language: "Java",
            difficulty: "Hard",
            url: "https://youtube.com",
        });

        setComments([
            {
                userId : 0,
                userName : "abc",
                msg: "haha"
            },
            {
                userId : 1,
                userName : "abcd",
                msg: "hahahahaha"
            }
        ]);

        setLoaded(true);

    },[]);

    return <>

        {isLoaded ? <div>

            <h1>{courseInfo.name}</h1>
            <div/>
            <h2>{courseInfo.detail}</h2>
            <Divider/>

            <h3>Language: {courseInfo.language}</h3>
            <div/>
            <h3>Difficulty: {courseInfo.difficulty}</h3>
            <div/>
            <a href={courseInfo.url}></a>

            <Divider/>
            {
                comments.map(element => (<CommentCard key={element.courseId} userName={element.userName} msg={element.msg}/>)
                )
            }

        </div> : <h1>Fetching data...</h1>}

    </>;
};
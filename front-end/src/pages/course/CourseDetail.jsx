import {React,useState} from "react";
import {Box, CardMedia, Paper, Typography, useTheme} from "@mui/material";
import {CommentCard} from "./CommentCard";
import * as Constants from "../../util/Constants.mjs";
import * as Mockaroo from "../../mockApi/apis.mjs";
import * as Logger from "../../util/Logger.mjs";


export const CourseDetail = props => {

    //TODO: Put useState here
    const [courseInfo,setCourseInfo] = useState(undefined);
    const [comments, setComments] = useState(undefined);
    const [isLoaded, setLoaded] = useState(false);
    const theme = useTheme();

    Logger.verbose(CourseDetail.name + " Loaded!");

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

    //const imgUrl = Mockaroo.mockImageApi(1920,1080);

    //Logger.info(`Image URL: ${imgUrl}`);

    return <>

        {isLoaded ? <div>

            <Box sx={{
                margin: Constants.UI_HORIZ_OFFSET
            }}>

                {/*Course Image*/}
                <CardMedia
                    alt="course_image"
                    image={Mockaroo.mockImageApi(1920,1080)}
                    sx={{
                        height:300,
                        borderRadius: Constants.UI_CORNER_RADIUS
                    }}
                />


                {/* Course Title and Description Section */}
                <Box sx={{
                    marginY: 3
                }}>
                    {/*Course Name*/}
                    <Typography variant="h1" sx={{
                        //margin: Constants.UI_HORIZ_OFFSET,
                        textAlign: 'left',
                        fontWeight: 'bold',
                        //fontFamily: 'Roboto',
                        letterSpacing: 2
                        //color: "text.primary",
                    }}>{courseInfo.name}</Typography>

                    {/*Course Description*/}
                    <Typography variant="h3" sx={{
                        //fontFamily: 'Roboto',
                        textAlign: 'left'
                    }}>{courseInfo.detail}
                    </Typography>
                </Box>

                {/* Course Information Section */}
                <Paper

                    elevation={0}
                    sx={{
                        boxShadow : 1,
                        marginY: 3,
                        borderRadius: Constants.UI_CORNER_RADIUS,
                        padding: Constants.UI_CORNER_RADIUS / 2
                    }}
                >
                    <Typography variant="h5" sx={{
                        textAlign: 'left',
                        fontFamily: "sans-serif"
                    }}>Language: {courseInfo.language}</Typography>


                    <Typography variant="h5" sx={{
                        textAlign: 'left'
                    }}>Difficulty: {courseInfo.difficulty}</Typography>

                    <a href={courseInfo.url}></a>
                </Paper>

                {/*//<Divider/>*/}
                {
                    comments.map(element => (<CommentCard key={element.userId} userName={element.userName} msg={element.msg}/>)
                    )
                }


            </Box>


        </div> : <h1>Fetching data...</h1>}

    </>;
};
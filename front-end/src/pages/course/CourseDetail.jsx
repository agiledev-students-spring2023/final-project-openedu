import {React, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Box, Button, CardMedia, Rating, Typography} from "@mui/material";
import {Favorite, PlayArrowRounded} from "@mui/icons-material";
import * as Constants from "../../util/Constants.mjs";
import * as Util from "../../util/Util.mjs";
import axios from "axios";
import {BackButton} from "../../containers/BackButton/BackButton";
import Loading from "../../containers/Loading/Loading";


const Main = (props) => {
    const navigate = useNavigate();
    const {course} = props;

    useEffect(() => {

        Util.invokeCallback("setNewPage", 1);

    }, []);

    return (
        <Box>
            <Box
                className="prompt"
                sx={{}}>
                <CardMedia
                    sx={{
                        borderRadius: Constants.UI_HORIZ_OFFSET,
                    }}
                    component="img"
                    height="200"
                    image={course.imageUrl ?? "Course Image"}
                    alt={course.name}
                />

                <Box className="prompt-texts"
                     sx={{
                         display: 'flex',
                         flexDirection: 'column',
                         marginTop: '3vh'
                     }}>
                    <Typography
                        variant='h5'
                        sx={{
                            display: 'flex',
                        }}
                    >
                        {course.name ? course.name : "Unknown Course"}
                    </Typography>
                    <Typography
                        variant='h11'
                        sx={{
                            display: 'flex',
                        }}
                    >
                        {course.university ? course.university : "Unknown university"}
                    </Typography>
                </Box>
            </Box>

            <Box
                className="play-buttons">
                <Box sx={{
                    marginTop: '3vh',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <Button
                        variant='contained'
                        sx={{
                            width: "45%",
                            display: 'flex'
                        }}
                        onClick={() => {
                            navigate(`/courses/play/${course.courseId}`);
                        }}>
                        <PlayArrowRounded/>
                        Play </Button>
                    <Button
                        variant='contained'
                        color="error"
                        sx={{
                            width: "45%",
                            display: 'flex',
                        }}
                        onClick={() => {
                        }}>
                        <Favorite/>
                        Favorite </Button>

                </Box>
            </Box>
            <InfoSec course={course}/>
        </Box>
    );
};

// Todo: Fix alignment issue
const InfoSec = (props) => {
    const {
        instructor1, instructor2, instructor3,
        description, courseHours, prerequisites, difficulty, language
    } = props.course;
    console.log(props.course);

    return (
        <Box>
            <Box sx={{
                marginTop: '2vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start'
            }}>


                <Box sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    marginTop: "10px"
                }}>
                    <Typography variant='h6' sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginRight: "10px",
                        fontWeight: "600"
                    }}>
                        Instructor(s):</Typography>
                    <Typography
                        sx={{}}>{`${instructor1 === '' ? 'Unknown' : `${instructor1}`} ${instructor2 === '' ? '' : `, ${instructor2}`}`}</Typography>
                </Box>


                <Box sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    marginTop: "10px"
                }}>
                    <Typography variant='h6' sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginRight: "10px",
                        fontWeight: "600"
                    }}>
                        Difficulty:
                    </Typography>
                    <Rating name="read-only" value={difficulty} readOnly precision={0.5} sx={{
                        '& .MuiRating-iconEmpty': {
                            color: '#fff',
                        }
                    }}/>
                </Box>


                <Box sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    marginTop: "10px"
                }}>
                    <Typography variant='h6' sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginRight: "10px",
                        fontWeight: "600"
                    }}>

                        Prerequisites:</Typography>
                    <Typography sx={{}}>{prerequisites}</Typography>
                </Box>


                <Box sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    marginTop: "10px"
                }}>
                    <Typography variant='h6' sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginRight: "10px",
                        fontWeight: "600"
                    }}>
                        Languages:
                    </Typography>

                    <Typography sx={{}}>{language}</Typography>
                </Box>


                <Box sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    marginTop: "10px"
                }}>

                    <Typography variant='h6' sx={{
                        noWrap: "true",
                        display: 'flex',
                        justifyContent: 'center',
                        marginRight: "10px",
                        fontWeight: "600"
                    }}>
                        Course Hour:
                    </Typography>
                    <Typography sx={{}}>{courseHours}</Typography>

                </Box>
            </Box>


            <Box sx={{marginTop: '20px'}}>
                <Typography
                    sx={{fontWeight: 'bold', float: 'left', clear: 'both', fontSize: '20px'}}>Introduction:</Typography>
                <Typography sx={{
                    //maxHeight: { lg: '120px', sm: '100px', xs: '50px' },
                    //overflow: 'scroll',
                    align: 'left',
                    clear: 'both'
                }}>
                    {description}
                </Typography>
            </Box>
        </Box>
    );
};


export const CourseDetail = () => {

    const [comments, setComments] = useState(undefined);
    const [course, setCourse] = useState({});
    const [isLoaded, setLoaded] = useState(false);
    const {courseId} = useParams();

    useEffect(() => {

        axios.get(
            Util.getServerAddr() + "/course/detail",
            {
                params: {
                    courseId: courseId,
                    mock: "false"
                }
            }
        ).then(res => {

            // localStorage.setItem("course", JSON.stringify(res.data.course));
            setCourse(res.data.content);
            setLoaded(true);
        });
    }, []);


    //const imgUrl = Mockaroo.mockImageApi(1920,1080);

    //Logger.info(`Image URL: ${imgUrl}`);

    return (
        <>
            <BackButton/>
            {isLoaded ? (<>
                <Main course={course}/>
            </>) : <Loading/>}
        </>
    );
};

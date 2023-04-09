import * as React from 'react';
import { Card, Divider, CardActions, CardContent, Box, Button } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DoneIcon from '@mui/icons-material/Done';

export default function FeedbackCard(props) {
    const { name, description, feedId, wikiUrl } = props;
    const navigate = useNavigate();

    const handleReadMore = () => {
        navigate(`/post/view/${feedId??'0'}`); //TODO: replace with error message if postID is not provided
    };

    return (
        <Grid item xs={12} md={6} lg={4} sx={{
            paddingTop: '20px',
        }}>
            <Card sx={{ borderRadius: '15px' }}>
                <CardContent sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <Typography
                                variant="h11"
                                sx={{
                                    display: 'flex'
                                }}>
                                {`Feedback Title`}
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{
                                    display: 'flex'
                                }}>
                                {`Submit Time`}
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                bgcolor: '#ab2d25',
                                borderRadius: '8px',
                                color: '#fff',
                                width: '27%',
                                height: '40px',
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                maxWidth: 100
                            }}>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: '100%'
                            }}>
                                <DoneIcon sx={{ display: 'flex', marginLeft: '5%' }} />
                                <Typography sx={{ display: 'flex', marginRight: '8%' }} >
                                {`Received`}</Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Divider color='#D9D9D9'
                        sx={{
                            borderBottomWidth: 2,
                            marginTop: '4px'
                        }} />
                    <Typography variant="body2" color="text.secondary"
                        sx={{
                            display: 'flex',
                            marginTop: '4px'
                        }}>
                        {`Content...`}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={ handleReadMore }>Check</Button>
                </CardActions>
            </Card>
        </Grid >
    );
}
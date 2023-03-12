import React from "react";
import {Card, CardContent, Divider, Typography} from "@mui/material";

export const CommentCard = props => {

    //TODO: Put useState here

    return <Card>
        <CardContent>
            <Typography variant="h5">{props.userName??""}</Typography>

            <Divider/>

            <Typography variant="h3">{props.msg??""}</Typography>

            <div/>

        </CardContent>
    </Card>;
};
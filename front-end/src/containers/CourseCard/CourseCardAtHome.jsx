import React from "react";
import { Box, Paper, Typography } from "@mui/material";

export default function CourseCardAtHome({ entry }) {
    const { name } = entry.name
        ? entry
        : { name: "Title"};

    const cardSize = 106;



    return (
        <>
            <Paper
                variant="outlined"
                elevation={0}
                square
                sx={{
                    width: cardSize,
                    height: cardSize,
                    borderRadius: "20px",
                    display: 'grid',
                    gridTemplateColumn: '1fr',
                    gridTemplateRows: '1fr',
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        width: cardSize,
                        height: cardSize,
                        borderRadius: "20px",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        gridColumn: '1 / 1',
                        gridRow: '1 / 1',
                        backgroundImage: `url(${entry.imageUrl ?? "Course Image"})`,
                        filter: "blur(2px) brightness(0.5)",
                    }}
                />
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: "10%",
                        marginLeft: "5%",
                        gridColumn: '1 / 1',
                        gridRow: '1 / 1',
                        zIndex: 1000,
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            display: "flex",
                            fontSize: "15px",
                            fontWeight: "bold",
                            textTransform: "capitalize",
                            color: "white",
                        }}
                    >
                        {name}
                    </Typography>
                </Box>
            </Paper>
        </>
    );
}

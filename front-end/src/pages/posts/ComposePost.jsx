import React from 'react'
import { Box } from '@mui/material';
import MDEditor from '@uiw/react-md-editor';

export default function ComposePost() {
    const [value, setValue] = React.useState("**Hello world!!!**");
    return (
        <Box>
            <MDEditor
                value={value}
                onChange={setValue}
            />
            <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap' }} />
        </Box>
    )
}

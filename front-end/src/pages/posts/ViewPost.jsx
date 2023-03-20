import React from 'react'
import MDEditor from '@uiw/react-md-editor'
import { Box } from '@mui/material'
// The props will be md source.
export default function ViewPost(props) {
    return (
        <Box>
            <MDEditor.Markdown source={"`value` **HHHHHH**"} style={{ whiteSpace: 'pre-wrap' }} />
        </Box>
    )
}

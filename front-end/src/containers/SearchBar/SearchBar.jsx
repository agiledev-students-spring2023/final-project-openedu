import React, { useState } from 'react'
import { Box, TextField, InputAdornment, Button } from '@mui/material'
import HighlightOff from '@mui/icons-material/HighlightOff'
import styled from '@emotion/styled'

// change the style of TextFiled in MUI
const SearchField = styled(TextField)(({ theme }) => ({
  '& .MuiFilledInput-root': {
    borderRadius: '20px', // Set your desired border radius value here
    backgroundColor: '#B8C3FF',
    opacity: '0.8',
    border: '1px solid #fff',
  },
  '& .MuiFilledInput-input': {
    padding: '10px', // Set your desired padding value here
    marginLeft: '10px',
    height:'20px'
  },
}));

// A react search bar component
export default function SearchBar() {
  const [input, setInput] = useState("")
  const handleCleanInput = (e) => {
    e.preventDefault()
    setInput("")
  }
  return (
    <Box sx={{
      position: 'absolute',
      top: '0',
      bottom: '0',
      left: '0',
      right: '0',
    }}>
      <SearchField
        variant="filled"
        placeholder={`Let's see...`}
        value={input}
        sx={{
          width: "70%",
          marginTop: '5%',
          zIndex: '100'
        }}
        InputProps={{
          disableUnderline: true,
          endAdornment: (
            <InputAdornment position="end">
              <Button
                disableRipple
                variant="plain"
                sx={{ width: '1px' }}
                onClick={handleCleanInput}>
                <HighlightOff />
              </Button>
            </InputAdornment>
          ),
        }}
        onChange={(e) => { setInput(e.target.value); }}
      />
    </Box>
  )
}

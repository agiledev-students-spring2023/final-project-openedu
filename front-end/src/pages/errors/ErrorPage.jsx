import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <Typography variant="h1" align="center" gutterBottom>
        Oops!
      </Typography>
      <Typography variant="h5" align="center" gutterBottom>
        Something went wrong. Please try again later.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
        Go back to the previous page
      </Button>
    </Box>
  );
}

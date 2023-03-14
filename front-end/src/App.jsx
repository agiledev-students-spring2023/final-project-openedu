import './App.css';
import React from "react"
import MainRouter from './MainRouter.jsx';
import { createTheme, ThemeProvider } from '@mui/material';
import { purple } from '@mui/material/colors';
import Subjects from './containers/Layout/index'


// Global styling
const theme = createTheme({
  palette:{
    primary: purple
  },
  components:{
    MuiButton:{
      variants:[
        {
          props:{variant:"bold"},
          style:{
            font:"bold",
            border:`4px solid white`,
            color:'white'
          }
        }
      ]
    }
  }
});

function App() {
  // Note: Main router is a wrapper of the main body
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <MainRouter/>
    </div>
    </ThemeProvider>
  );
}

export default App;

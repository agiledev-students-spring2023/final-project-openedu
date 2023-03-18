import './App.css';

import {MainRouter} from './MainRouter.jsx';
import * as Util from './util/Util.mjs';
import React from "react";
import * as Logger from "./util/Logger.mjs";
import { ThemeProvider } from '@mui/material';

export function App() {

  Util.addCallback("onPageIndexChanged", (newIndex) => {
    Logger.verbose(`Page index changed! New Index: ${newIndex}`);
  });

  // Note: Main router is a wrapper of the main body
  return (
    <ThemeProvider theme={Util.getTheme()}>
    <div className="App">
      <MainRouter/>
    </div>
    </ThemeProvider>
  );
}

import './App.css';

import { MainRouter } from './MainRouter.jsx';
import * as Util from './util/Util.mjs';
import React, { useEffect } from "react";
import * as Logger from "./util/Logger.mjs";
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Layout } from "./containers/Layout/Layout";
import { RouterProvider, useNavigate } from "react-router-dom";
import { getRoutes } from "./util/Routing.mjs";

let router;

export function App() {


  Util.addCallback("onPageIndexChanged", (newIndex) => {
    Logger.verbose(`Page index changed! New Index: ${newIndex}`);
  });

  // Note: Main router is a wrapper of the main body
  return (
    <ThemeProvider theme={Util.getTheme()}>
      <CssBaseline />
      <div className="App">
        <Layout>
          {getRoutes()}
        </Layout>
        {/*<MainRouter/>*/}
      </div>
    </ThemeProvider>
  );
}

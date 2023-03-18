import React from "react";
//import { Navigate, useSearchParams } from "react-router-dom"
import {BeginComponent} from "./BeginComponent.jsx";

export function Begin() {
  const handleSubmit = async e => {
    // prevent the HTML form from actually submitting... we use React's javascript code instead
    e.preventDefault();
  };

    return (
      <div>
        {<BeginComponent handleSubmit={handleSubmit}/>}
      </div>
    );
}


import React from "react"
//import { Navigate, useSearchParams } from "react-router-dom"
import BeginComponent from "../../containers/BeginComponent"

const Login = props => {
 
  const handleSubmit = async e => {
    // prevent the HTML form from actually submitting... we use React's javascript code instead
    e.preventDefault()
  }

    return (
      <div className="Login">
        {/*<BeginComponent handleSubmit={handleSubmit}/>*/}
      </div>
    )
}

export default Login

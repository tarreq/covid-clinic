import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectUser } from "../store/authSlice"
// import fire from "../config/fire"

export default ({ component: C, ...rest }) =>{

  // const user = useSelector(state => state.auth.user)
  const user = useSelector(selectUser)
  // const user = fire.auth().currentUser
  console.log("from priv. route: ", user)
 return (
  <Route
    {...rest}
    render={props =>
      user ? (
        <C {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
)}

// export default ({ component: Component, ...rest }) => (
//   <Route {...rest} render={(props) => (
//     fakeAuth.isAuthenticated === true
//       ? <Component {...props} />
//       : <Redirect to='/login' />
//   )} />
// )
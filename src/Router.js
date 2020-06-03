import React from "react"
import {Route, Switch } from "react-router-dom"

import Home from "./components/Home"
import About from "./components/About"
import Contact from "./components/Contact"
import Counter from "./components/Counter"
import Guide from "./containers/Guide"
import Login from "./components/Login"
import PrivateRoute from "./components/PrivateRoute"



const Router = () => { 
    
    return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/login" component={Login} />
      <Route path="/counter" component={Counter} />
      <Route path="/guide" component={Guide} />
    </Switch>
)}

export default Router
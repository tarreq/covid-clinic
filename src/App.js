import React from 'react'
import Container from '@material-ui/core/Container'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import RTL from './rtl';
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectUser } from "./store/authSlice"

import fire from "./config/fire"

import Navbar from "./components/Navbar"
import Home from "./components/Home"
import About from "./components/About"
import Guide from "./containers/Guide"
import Login from "./components/Login"
import PrivateRoute from "./components/PrivateRoute"
import SignUp from './components/Signup';

function App() {

  // const [user, setUser] = useState(null)
  const user = useSelector(selectUser)

  const theme = createMuiTheme({
    direction: 'rtl',
    typography: { fontFamily: [ 'bbcsmall' ].join(','), },
    palette: {
      primary: {
        // light: will be calculated from palette.primary.main,
        main: "#563D7C",
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        light: '#0066ff',
        main: '#9F6976',
        // dark: will be calculated from palette.secondary.main,
        contrastText: '#ffcc00',
      },
      error: {
        main: "#d50000"
      },
      // Used by `getContrastText()` to maximize the contrast between
      // the background and the text.
      contrastThreshold: 3,
      // Used by the functions below to shift a color's luminance by approximately
      // two indexes within its tonal palette.
      // E.g., shift from Red 500 to Red 300 or Red 700.
      tonalOffset: 0.2,
    }
    
  })
  
  return (
      <RTL>
        <MuiThemeProvider theme={theme}>
          <BrowserRouter>
          {user && <Navbar />}
          <Container>
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute exact path="/about" component={About} />
              <PrivateRoute exact path="/guide" component={Guide} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={SignUp} />
            </Switch>
          </Container>
          </BrowserRouter>
        </MuiThemeProvider>
      </RTL>
  )
}

export default App

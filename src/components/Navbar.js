import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'
import { Link as RouterLink } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import fire from "../config/fire"

import { useDispatch } from "react-redux"
import { setUser } from "../store/authSlice"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  menuLink: {
      color: "#ffffff",
      fontSize: 20
  },
  toolbar: {
      backgroundColor: "#563D7C"
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles()
  const dispatch = useDispatch()

  const signOut = () => {
    fire.auth().signOut()
      .then(() => dispatch(setUser(null)) )
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense" className={classes.toolbar}>
        <div style={{ width: '100%' }}>
          <Box display="flex">
            <Box>
              <Button component={RouterLink} to="/" className={classes.menuLink}>
                الرئيسية
              </Button>

              <Button component={RouterLink} to="/guide" className={classes.menuLink}>
                الدليل
              </Button>
              <Button component={RouterLink} to="/about" className={classes.menuLink}>
                الأخبار
              </Button>
              </Box>
              <Box>
              <Button onClick={signOut} className={classes.menuLink}>
                خروج
              </Button>
              </Box>
            </Box>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
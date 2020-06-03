import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { useDispatch } from "react-redux"
import fire from "../config/fire"
import { isValidEmail } from "../Utils"

import { setUser } from "../store/authSlice"

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      عيادة كورونا
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    // fontFamily: "Arial"
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login(props) {
  const classes = useStyles()
  const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [usernameError, setUsernameError] = useState(null)
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState(null)
    const [loginError, setLoginError] = useState(null)
    const [loading, setLoading] = useState(false)


    const resetErrors = () => {
      setUsernameError(null)
      setPasswordError(null)
    }


  const login = (e) => {
    e.preventDefault()
    resetErrors()

    if(!username || !isValidEmail(username)) {
      setUsernameError("من فضلك أدخل البريد الإلكتروني")
      return
     }
    if(!password) {
      setPasswordError("من فضلك أدخل كلمة المرور")
      return
     }
     setLoading(true)
    fire.auth().signInWithEmailAndPassword(username, password).then((u)=>{
      dispatch(setUser(u.user.providerData[0]))
      setLoading(false)
      props.history.push("/")

    }).catch((error) => {
      setLoading(false)
        console.log(error)
        switch(error.code){
          case "auth/wrong-password":
            setLoginError("خطأ بالبريد أو كلمة المرور")
            break
          case "auth/user-not-found":
            setLoginError("هذا البريد غير مسجل")
            break
          case "auth/too-many-requests":
            setLoginError("محاولات غير ناجحة ، حاول لاحقاً")
            break
          default:
            setLoginError("")
            
        }
      });
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          تسجيل الدخول
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="البريد الإلكتروني"
            name="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="email"
            autoFocus
            error={usernameError}
            helperText={usernameError}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            autoComplete="current-password"
            error={passwordError}
            helperText={passwordError}
          />
          <Typography component="h1" variant="h6" color="main" align="center">
            {loginError && loginError}
          </Typography>
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="redError" />}
            label="تذكرني"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={login}
          >
            {loading ? <CircularProgress color="secondary" size={24}/> : (<Typography>تسجيل الدخول</Typography>)}
            
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                نسيت كلمة المرور؟
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"ليس لديك حساب؟ سجل الآن"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import Box from '@material-ui/core/Box'
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp(props) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [firstName, setFirstName] = useState("")
  const [firstNameError, setFirstNameError] = useState(null)
  const [lastName, setLastName] = useState("")
  const [lastNameError, setLastNameError] = useState(null)
  const [type, setType] = useState(null)
  const [typeErrorValue, setTypeErrorValue] = useState(null)
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState(null)
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState(null)
  const [signupError, setSignupError] = useState(null)
  const [loading, setLoading] = useState(null)

  const resetErrors = () => {
    setFirstNameError(null)
    setLastNameError(null)
    setEmailError(null)
    setPasswordError(null)
  }

  const handleTypeChange = (event) => {
    setType(event.target.value);
  }

  const signup = (e) => {
    e.preventDefault()
    resetErrors()
    // fire.auth().createUserWithEmailAndPassword(email, password).then((u)=>{
    // }).then((u)=>{console.log(u)})
    // .catch((error) => {
    //     console.log(error);
    //   })
    if(!firstName) {
      setFirstNameError("من فضلك أدخل إسمك الأول")
      return
     }
    if(!lastName) {
      setLastNameError("من فضلك أدخل إسمك الأخير")
      return
     }
    if(!type) {
      setTypeErrorValue("من فضلك اختر نوع العضوية")
      return
     }
    if(!email || !isValidEmail(email)) {
      setEmailError("من فضلك أدخل بريد الكتروني صحيح")
      return
     }
    if(!password) {
      setPasswordError("من فضلك أدخل كلمة المرور")
      return
     }
     setLoading(true)
    fire.auth().createUserWithEmailAndPassword(email, password)
    .then(u => {
      // console.log("Sign up result: ", result)
      dispatch(setUser(u.user.providerData[0]))
      setLoading(false)
      props.history.push("/")
    return u.user.updateProfile({
        displayName: `${firstName},${lastName}`
    })
    }).catch(function(error) {
      setLoading(false)
      console.log(error)
      switch(error.code){
        case "auth/weak-password":
          setSignupError("كلمة المرور لابد أن تحتوي علي 6 أحرف فأكثر")
          break
        case "auth/email-already-in-use":
          setSignupError("هذا البريد مسجل بالفعل")
          break
        default:
          setSignupError("")
          
      }
    })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          إنشاء حساب
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="الإسم الأول"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                autoFocus
                error={firstNameError}
                helperText={firstNameError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="الإسم الأخير"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                autoComplete="lname"
                error={lastNameError}
                helperText={lastNameError}
              />
            </Grid>
            <Grid item xs={12}>
            <FormControl fullWidth variant="outlined" className={classes.formControl} error={!typeErrorValue}>
                    <InputLabel id="demo-simple-select-helper-label">اختر نوع العضوية</InputLabel>
                    <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={type}
                    onChange={handleTypeChange}
                    className={classes.select}
                    >
                    {/* <MenuItem value="">
                        <em>غير محدد</em>
                    </MenuItem> */}
                    <MenuItem value={1}>مريض</MenuItem>
                    <MenuItem value={2}>طبيب</MenuItem>
                    <MenuItem value={3}>متابع</MenuItem>
                    </Select>
                    <FormHelperText>{typeErrorValue && typeErrorValue}</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="البريد الإلكتروني"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                error={emailError}
                helperText={emailError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="كلمة المرور"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                error={passwordError}
                helperText={passwordError}
              />
            </Grid>
            <Grid item xs={12}>
              {/* <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              /> */}
            </Grid>
          </Grid>
            <Typography component="h1" variant="h6" color="main" align="center">
            {signupError && signupError}
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={signup}
          >
            {loading ? <CircularProgress color="secondary" size={24}/> : (<Typography>أنشيء حساباً</Typography>)}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                لديك حساب بالفعل؟ ادخل من هنا
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
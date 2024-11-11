import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import { SuccessToast, ErrorToast } from "../../Common/Toasts/Toasts";
import axios from 'axios';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Upgrad
      </Link>{' '}
      {new Date().getFullYear() - 2}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

async function userRegistrationRequest(registrationRequestData) {
  const REGISTRATION_URL = "http://localhost:8080/api/auth/signup";
  console.log("Registration Data :: ");
  console.log(registrationRequestData);
  try {
    var response = await axios.post(REGISTRATION_URL, registrationRequestData);
    console.log(response.data);
    SuccessToast('SignUp Successfully!')
    setTimeout(() => {
      window.location.replace("/");
    }, 1000)
  } catch (err) {
    ErrorToast('Please check credentials')
    console.log(err.response.data);
  }
}


const defaultTheme = createTheme();

export default function MyRegistration() {

  const color = pink[500];

  const [fnError, setFirstNameError] = React.useState(false)
  const [lnError, setLasttNameError] = React.useState(false)
  const [emailError, setEmailError] = React.useState(false)
  const [passwordError, setpasswordError] = React.useState(false)
  const [confirmpasswordError, setconfirmpasswordError] = React.useState(false)
  const [contactError, setContactError] = React.useState(false)
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setFirstNameError(false)
    setLasttNameError(false)
    setEmailError(false)
    setpasswordError(false)
    setContactError(false)
    setconfirmpasswordError(false)
    const data = new FormData(event.currentTarget);
    var registrationRequestData = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
      contactNumber: data.get('contactNumber'),
      "role": ["ADMIN"]
    };
    if(data.get('firstName') === ''){
      setFirstNameError(true)
    }
    if(data.get('lastName') === ''){
      setLasttNameError(true)
    }
    if(data.get('email') === ''){
      setEmailError(true)
    }
    if(data.get('password') === ''){
      setpasswordError(true)
    }
    if(data.get('confirmPassword') === ''){
      setconfirmpasswordError(true)
    }
    if(data.get('contactNumber') === ''){
      setContactError(true)
    }
    if(data.get('firstName') && data.get('lastName') && data.get('email') && data.get('password') && data.get('confirmPassword') && data.get('contactNumber')){
      userRegistrationRequest(registrationRequestData);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: color }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoComplete="first-name"
              autoFocus
              error={fnError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="last-name"
              autoFocus
              error={lnError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              error={emailError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="password"
              error={passwordError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="confirm-password"
              error={confirmpasswordError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="contactNumber"
              label="Contact Number"
              id="contactNumber"
              autoComplete="contact-number"
              error={contactError}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{ background: '#3f51b5' }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/" variant="body2">
                  {"Already have an account? Sign in"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
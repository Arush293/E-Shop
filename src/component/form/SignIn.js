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
import axios from 'axios';
import { SuccessToast, ErrorToast } from "../../Common/Toasts/Toasts";


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

const defaultTheme = createTheme();

export default function MySignIn() {

  const [userError, setUserError] = React.useState(false)
  const [passwordError, setpasswordError] = React.useState(false)


  const color = pink[500];
  const handleSubmit = (event) => {
    event.preventDefault();
    setUserError(false)
    setpasswordError(false)
    const data = new FormData(event.currentTarget);
    var signInRequestData = {
      username: data.get('email'),
      password: data.get('password'),
    };
    if (data.get('email') === '') {
      setUserError(true)
    }
    if (data.get('password') === '') {
      setpasswordError(true)
    }
    if (data.get('email') && data.get('password')) {
      userSignInRequest(signInRequestData);
    }
  };

  const userSignInRequest = async (signInRequestData) => {
    const SIGNIN_URL = "http://localhost:8080/api/auth/signin";
    sessionStorage.setItem('user', signInRequestData.username);
    try {
      var response = await axios.post(SIGNIN_URL, signInRequestData);
      console.log(response.headers['x-auth-token'])
      sessionStorage.setItem('token', response.headers['x-auth-token'])
      SuccessToast('Login Successfully!')
      setTimeout(() => {
        window.location.replace("/products");
      }, 300)
    } catch (err) {
      ErrorToast('Please check credentials')
    }
  }

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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={userError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={passwordError}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{ background: '#3f51b5' }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
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
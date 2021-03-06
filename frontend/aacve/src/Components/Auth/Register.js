import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import {
  CssBaseline,
  Typography,
  Container,
  TextField,
  Button,
  Link,
  Grid,
  Snackbar,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Register() {
  const classes = useStyles();

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const history = useHistory();

  const handleRegisterClick = () => {
    if (firstName && lastName && email && password) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/register`, {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        })
        .then((result) => {
          if (result.status === 201) {
            console.log(result.data.message);
            history.push('/login');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setIsAlertOpen(true);
    }
  };

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsAlertOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First name"
            name="firstName"
            onChange={(event) => setFirstName(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last name"
            name="lastName"
            onChange={(event) => setLastName(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => handleRegisterClick()}
          >
            Register
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link
                to="/login"
                variant="body1"
                onClick={() => history.push('/login')}
              >
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <div>
        <Snackbar
          open={isAlertOpen}
          autoHideDuration={4000}
          onClose={handleAlertClose}
        >
          <Alert onClose={handleAlertClose} severity="error">
            Please fill in all the fields!
          </Alert>
        </Snackbar>
      </div>
    </Container>
  );
}

export default Register;

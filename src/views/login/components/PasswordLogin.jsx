import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Stack, Alert } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import { loginCustomer } from "../../../services/AuthServices";
import { useAuth } from "../../../utils/auth";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function PasswordLogin() {
  const [errMsg, setErrMsg] = React.useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const response = await loginCustomer({
        NIC: data.get("nic"),
        password: data.get("password"),
      });
      if (response.status === 200) {
        setAuth(response.data.accessToken);

        const from = location.state?.from || "/customer/home";
        navigate(from, { replace: true });
      }
    } catch (err) {
      if (err.response?.status === 400) {
        setErrMsg("Missing NIC or Password!");
      } else if (err.response?.status === 401) {
        setErrMsg("Invalid NIC, password pair!");
      } else if (err.response?.status === 500) {
        setErrMsg("Server Error! Try again later.");
      } else if(err.response){
        setErrMsg("No server response!");
      }else{
        setErrMsg("Something went wrong!")
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {errMsg != "" ? (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert severity="error">{errMsg}</Alert>
            </Stack>
          ) : null}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="nic"
              label="NIC"
              name="nic"
              autoComplete="nic"
              onChange={() => {
                setErrMsg("");
              }}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              onChange={() => {
                setErrMsg("");
              }}
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
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

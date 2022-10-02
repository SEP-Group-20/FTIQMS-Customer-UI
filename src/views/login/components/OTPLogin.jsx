import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Stack, Alert } from "@mui/material";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { authentication } from "../../../services/firebaseService";
import {
  getMobileByNIC,
  validateFirebaseToken,
} from "../../../services/AuthServices";
import { useLocation, useNavigate } from "react-router-dom";
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

export default function OTPLogin() {
  const { setAuth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [NICStatus, setNICStatus] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState("");
  const [NIC, setNIC] = React.useState("");

  /*this functions configures invissible recapcha to 
  verify that the account creater is a human*/
  const configureRecapcha = () => {
    console.log("recap-entered");
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recapcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          console.log("Recapcha verified!");
        },
      },
      authentication
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrMsg("");
    const data = new FormData(event.currentTarget);
    if (!NICStatus) {
      try {
        setNIC(data.get("NIC"));
        const mobileRes = await getMobileByNIC({ NIC: data.get("NIC") });
        if (mobileRes.data.success) {
          //here send the otp code
          configureRecapcha();
          const phoneNumber = "+94" + mobileRes.data.mobile;
          console.log(phoneNumber);
          const appVerifier = window.recaptchaVerifier;
          signInWithPhoneNumber(authentication, phoneNumber, appVerifier)
            .then((confirmationResult) => {
              // SMS sent. Prompt user to type the code from the message, then sign the
              // user in with confirmationResult.confirm(code).
              window.confirmationResult = confirmationResult;
              console.log("otp has been sent");
              setNICStatus(true);
              // ...
            })
            .catch((error) => {
              setErrMsg("couldn't send the OTP!");
            });
        } else {
          setErrMsg("Unregistered NIC!");
        }
      } catch (err) {
        if (!err?.response) {
          setErrMsg("No server response!");
        } else if (err.response?.status === 400) {
          setErrMsg("Invalid input fields!");
        } else if (err.response?.status === 401) {
          setErrMsg("You're unauthorized!");
        } else {
          setErrMsg("Server Error! Try again later.");
        }
      }
    } else {
      window.confirmationResult
        .confirm(data.get("OTP"))
        .then(async (result) => {
          const user = result.user;
          try {
            const response = await validateFirebaseToken({
              NIC: NIC,
              firebaseToken: user.accessToken,
              user_id: user.uid,
            });
            //setAuth here
            if (response.status === 200) {
              setAuth(response.data.accessToken);

              const from = location.state?.from || "/customer/home";
              navigate(from, { replace: true });
            }
          } catch (err) {
            if (!err?.response) {
              setErrMsg("No server response!");
            } else if (err.response?.status === 400) {
              setErrMsg("Invalid input fields!");
            } else if (err.response?.status === 401) {
              setErrMsg("You're unauthorized!");
            } else {
              setErrMsg("Server Error! Try again later.");
            }
          }
        })
        .catch((error) => {
          console.log(error);
          setErrMsg("Wrong verification code!");
        });
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
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="nic"
                  label="NIC"
                  name="NIC"
                  disabled={NICStatus ? true : false}
                  onChange={() => setErrMsg("")}
                  autoComplete="nic"
                  autoFocus
                />
              </Grid>

              {NICStatus && (
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="otp"
                    label="OTP"
                    name="OTP"
                    autoComplete="otp"
                    onChange={() => setErrMsg("")}
                    autoFocus
                  />
                </Grid>
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Continue
            </Button>
            <Grid container>
              <Grid item xs={12}>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <div id="recapcha-container"></div>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

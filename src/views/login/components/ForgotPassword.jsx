import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockResetIcon from "@mui/icons-material/LockReset";
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
import PreLoginAppBar from "../../../components/PreLoginAppBar";
import Tooltip from "@mui/material/Tooltip";
import { resetPassword } from "../../../services/CustomerServices";

const PWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

const theme = createTheme();

export default function ForgotPWD() {
  const { setAuth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [NICStatus, setNICStatus] = React.useState(false);
  const [verified, setverified] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState("");
  const [NIC, setNIC] = React.useState("");

  const [pwd, setPWD] = React.useState();
  const [pwdValidity, setPWDValidity] = React.useState(true);
  const [cnfrmPWD, setCnfrmPWD] = React.useState();
  const [cnfrmValidity, setCnfrmValidity] = React.useState(true);

  React.useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setPWDValidity(result);
  }, [pwd]);

  React.useEffect(() => {
    setCnfrmValidity(pwd === cnfrmPWD);
  }, [pwd, cnfrmPWD]);

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
    } else if (!verified) {
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

              setverified(true);
              //   const from = location.state?.from || "/customer/home";
              //   navigate(from, { replace: true });
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
    } else {
      try {
        const res = await resetPassword({
          userNIC: NIC,
          newPassword: pwd,
          forgot: true,
        });

        if (res.data.success) {
          navigate(location.state?.from || "/Customer/Home", { replace: true });
        }
      } catch (err) {
        if (!err?.response) {
          setErrMsg("Something went wrong!");
        } else if (err.response?.status === 400) {
          setErrMsg("Invalid input fields");
        } else if (err.response?.status === 401) {
          setErrMsg("You are not authorized");
        } else {
          setErrMsg("No server response!");
        }
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundImage: `url("https://images.pexels.com/photos/9216590/pexels-photo-9216590.jpeg?cs=srgb&dl=pexels-erik-mclean-9216590.jpg&fm=jpg&_gl=1*b55um7*_ga*NjE4NDcwNTA3LjE2Njg1MzM4MTY.*_ga_8JE65Q40S6*MTY2ODUzMzgxNy4xLjEuMTY2ODUzMzk5MS4wLjAuMA..")`,
          backgroundSize: "100%",
          minHeight: "100vh",
        }}
      >
        <PreLoginAppBar />
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "15px",
              backgroundColor: `rgba(255, 255, 255, 0.8)`,
              paddingTop: "20px",
              paddingBottom: "40px",
              paddingX: "20px",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockResetIcon />
            </Avatar>
            <Typography>Forgot Password</Typography>
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
              <Grid container spacing={2} justifyContent="center">
                {!verified && (
                  <Grid item xs={10}>
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
                )}

                {NICStatus && !verified && (
                  <Grid item xs={10}>
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

                {verified && (
                  <Grid item xs={10}>
                    <Tooltip
                      title="Password should contain at least 8 charactors with an uppercase, a lowercase, a Number, and a special symbol. "
                      placement="left-start"
                    >
                      <TextField
                        required
                        fullWidth
                        id="pwd"
                        type="password"
                        label="New Password"
                        name="password"
                        error={!pwdValidity ? true : false}
                        onChange={(e) => {
                          setPWD(e.target.value);
                          setErrMsg("");
                        }}
                        autoFocus
                      />
                    </Tooltip>
                  </Grid>
                )}
                {verified && (
                  <Grid item xs={10}>
                    <TextField
                      required
                      fullWidth
                      id="cnfrm"
                      label="Confirm Password"
                      name="confirm"
                      type="password"
                      onChange={(e) => {
                        setCnfrmPWD(e.target.value);
                        setErrMsg("");
                      }}
                      error={!cnfrmValidity ? true : false}
                    />
                  </Grid>
                )}

                <Grid item xs={10}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mb: 2 }}
                    disabled={
                      verified
                        ? pwdValidity && cnfrmValidity
                          ? false
                          : true
                        : false
                    }
                  >
                    Continue
                  </Button>
                </Grid>
                <Grid item xs={10}>
                  <Link onClick={() => navigate("/forgotPwd")} variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <div id="recapcha-container"></div>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

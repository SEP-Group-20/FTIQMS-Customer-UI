import * as React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slide from "@mui/material/Slide";
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
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Stack, Alert } from "@mui/material";
import { authentication } from "../../services/firebaseService";

import { checkNICExistance } from "../../services/AuthServices";
import { registerCustomer } from "../../services/AuthServices";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import PreLoginAppBar from "../../components/PreLoginAppBar";

const PWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
const NAME_REGEX = /^[a-z ,.'-]+$/i;
const MOBILE_REGEX =
  /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[456789]\d{8}|(\d[ -]?){8}\d$/;
const NIC_REGEX = /^([0-9]{9}[x|X|v|V]|[0-9]{12})$/;

const theme = createTheme();

function Register() {
  const navigate = useNavigate();

  const [NICStatus, setNICStatus] = React.useState(false);
  const [NIC, setNIC] = React.useState("");
  const [NICValidity, setNICValidity] = React.useState(true);

  const [mobileStatus, setMobileStatus] = React.useState(false);
  const [mobile, setMobile] = React.useState("");
  const [mobileValidity, setMobileValidity] = React.useState(true);

  const [OTP, setOTP] = React.useState("");
  const [OTPStatus, setOTPStatus] = React.useState(false);

  const [firstName, setFirstName] = React.useState("");
  const [validFName, setValildFName] = React.useState(true);

  const [lastName, setLastName] = React.useState("");
  const [validLName, setValildLName] = React.useState(true);

  const [pwd, setPwd] = React.useState("");
  const [validPwd, setValidPwd] = React.useState(true);

  const [cnfrm, setCnfrm] = React.useState("");
  const [validCnfrm, setValidCnfrm] = React.useState(true);

  const [errMsg, setErrMsg] = React.useState("");

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
  // To apply the default browser preference instead of explicitly setting it.
  // firebase.auth().useDeviceLanguage();

  useEffect(() => {
    setErrMsg("");
  }, [NIC, mobile, OTP, firstName, lastName, pwd, cnfrm]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === cnfrm;
    setValidCnfrm(match);
  }, [pwd, cnfrm]);

  useEffect(() => {
    const result = NAME_REGEX.test(firstName);
    setValildFName(result);
  }, [firstName]);

  useEffect(() => {
    const result = NAME_REGEX.test(lastName);
    setValildLName(result);
  }, [lastName]);

  /*This handle submit funtion is called when submit button is hit */
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("time");
    try {
      if (!NICStatus) {
        const resOfExistance = await checkNICExistance({ NIC: NIC });
        if (resOfExistance.data.success) {
          setErrMsg("");
          return setNICStatus(true);
        }
        return setErrMsg("Entered NIC is already registered in the System!");
      } else if (!mobileStatus) {
        //send the OTP here
        configureRecapcha();
        const phoneNumber = "+94" + mobile;
        console.log(phoneNumber);
        const appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(authentication, phoneNumber, appVerifier)
          .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            console.log("otp has been sent");
            setMobileStatus(true);
            // ...
          })
          .catch((error) => {
            setErrMsg("couldn't send the OTP!");
          });
      } else if (!OTPStatus) {
        const code = OTP;
        window.confirmationResult
          .confirm(code)
          .then((result) => {
            // User signed in successfully.
            const user = result.user;
            setOTPStatus(true);
            // ...
          })
          .catch((error) => {
            setErrMsg("Wrong verification code!");
          });
      } else {
        //api calls here
        const resOfReg = await registerCustomer({
          NIC,
          password: pwd,
          firstName,
          lastName,
          mobile,
        });
        if (resOfReg.status === 201) {
          return navigate("/login", { replace: true });
        }
        console.log("this should not be logged!");
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
  };

  /*this funtion validates the NIC and returns
  true if it is valid, returns false otherwise */
  const validateNIC = (value) => {
    return NIC_REGEX.test(value);
  };
  /*This funtion simply validates the mobile numbers */
  const validateMobile = (value) => {
    return MOBILE_REGEX.test(value);
  };

  /*this function handles the changes of 
  NIC input field */
  const handleNICChange = (e) => {
    setNIC(e.target.value);
    setNICValidity(validateNIC(e.target.value));
  };

  const handleMobileChange = (e) => {
    setMobile(e.target.value);
    setMobileValidity(validateMobile(e.target.value));
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url("https://images.pexels.com/photos/9216590/pexels-photo-9216590.jpeg?cs=srgb&dl=pexels-erik-mclean-9216590.jpg&fm=jpg&_gl=1*b55um7*_ga*NjE4NDcwNTA3LjE2Njg1MzM4MTY.*_ga_8JE65Q40S6*MTY2ODUzMzgxNy4xLjEuMTY2ODUzMzk5MS4wLjAuMA..")`,
          backgroundSize: "100%",
          height: "100vh",
        }}
      >
        <PreLoginAppBar />
        <div>
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  backgroundColor: `rgba(255, 255, 255, 0.8)`,
                  padding: "20px",
                  borderRadius: "15px",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Register
                </Typography>
                {errMsg != "" ? (
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">{errMsg}</Alert>
                  </Stack>
                ) : null}
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 3 }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs>
                      <TextField
                        required
                        fullWidth
                        id="nic"
                        label="NIC"
                        name="nic"
                        autoComplete="nic"
                        disabled={NICStatus ? true : false}
                        onChange={handleNICChange}
                        error={!NICValidity ? true : false}
                        autoFocus
                      />
                    </Grid>
                    {NICStatus ? (
                      <Grid item xs={1}>
                        <CheckCircleOutlineIcon sx={{ color: "#17B505" }} />
                      </Grid>
                    ) : null}

                    {NICStatus ? (
                      <>
                        <Grid item xs>
                          <TextField
                            required
                            fullWidth
                            id="mobile"
                            type="tel"
                            label="Mobile"
                            name="mobile"
                            autoComplete="mobile"
                            autoFocus
                            disabled={mobileStatus ? true : false}
                            error={!mobileValidity ? true : false}
                            onChange={handleMobileChange}
                          />
                        </Grid>
                        {OTPStatus ? (
                          <Grid item xs={1}>
                            <CheckCircleOutlineIcon sx={{ color: "#17B505" }} />
                          </Grid>
                        ) : null}
                      </>
                    ) : null}
                    {mobileStatus && !OTPStatus ? (
                      <>
                        <Grid item xs={12}>
                          <p>We send and verification code to your number</p>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            id="otp"
                            label="Verification Code"
                            name="otp"
                            autoFocus
                            autoComplete="number"
                            onChange={(e) => setOTP(e.target.value)}
                          />
                        </Grid>
                      </>
                    ) : null}
                    {OTPStatus ? (
                      <Grid container mt={2} spacing={2}>
                        <Grid item xs>
                          <TextField
                            required
                            autoFocus
                            fullWidth
                            id="firstName"
                            label="First Name"
                            name="firstName"
                            autoComplete="firstName"
                            onChange={(e) => setFirstName(e.target.value)}
                            error={!validFName && firstName ? true : false}
                          />
                        </Grid>
                        <Grid item xs>
                          <TextField
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="lastName"
                            onChange={(e) => setLastName(e.target.value)}
                            error={!validLName && lastName ? true : false}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            type="password"
                            id="pwd"
                            label="Password"
                            name="password"
                            autoComplete="password"
                            onChange={(e) => setPwd(e.target.value)}
                            error={!validPwd && pwd ? true : false}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            type="password"
                            id="cnfrm"
                            label="Confirm Password"
                            name="confirm"
                            autoComplete="password"
                            onChange={(e) => setCnfrm(e.target.value)}
                            error={!validCnfrm && cnfrm ? true : false}
                          />
                        </Grid>
                      </Grid>
                    ) : null}
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={
                      !NICValidity ||
                      !NIC ||
                      (NICStatus && (!mobileValidity || !mobile)) ||
                      (mobileStatus && !OTP) ||
                      (OTPStatus &&
                        (!firstName ||
                          !pwd ||
                          !cnfrm ||
                          !validCnfrm ||
                          !validPwd ||
                          !validFName ||
                          (lastName && !validLName)))
                        ? true
                        : false
                    }
                  >
                    CONTINUE
                  </Button>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Link href="/login" variant="body2">
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>
                  <div id="recapcha-container"></div>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </div>
      </div>
    </>
  );
}

export default Register;

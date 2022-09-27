import React, { useState, useEffect } from "react";
import Slide from "@mui/material/Slide";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CheckCircle, DirectionsCar } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Alert, Modal, Stack } from "@mui/material";
import { authentication } from "../../../services/firebaseService";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useAuth } from '../../../utils/auth'
import { getVehicleDetails, isVehicleReal, isVehicleRegistered, registerVehicle } from "../../../services/vehicleServices";

const REGISTRATION_REGEX = /^(?:[a-zA-Z]{1,3}|(?!0*-)[0-9]{1,3})(-| )[0-9]{4}(?<!0{4})$/;

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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: "#E8FFEA",
  border: '4px solid green',
  boxShadow: 24,
  borderRadius: '25px',
  p: 2,
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column'
};

const theme = createTheme();

function RegisterVehicleForm() {

  const [registrationNumberStatus, setRegistrationNumberStatus] = useState(false);
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [registrationNumberValidity, setRegistrationNumberValidity] = useState(true);

  const [chassisNumberStatus, setChassisNumberStatus] = useState(false);
  const [chassisNumber, setChassisNumber] = useState("");
  const [chassisNumberValidity, setChassisNumberValidity] = useState(true);

  const [OTP, setOTP] = useState("");
  const [OTPStatus, setOTPStatus] = useState(false);

  const [owner, setOwner] = useState("");
  const [vehicleMake, setVehicleMake] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [fuel, setFuel] = useState("");
  const [fuelAllocationCategory, setFuelAllocationCategory] = useState("");
  const [fuelAllocation, setFuelAllocation] = useState("");

  const [buttonText, setButtonText] = useState("Register")

  const [checked, setChecked] = useState(true);

  const [errMsg, setErrMsg] = React.useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  const {auth} = useAuth();

  const userNIC = auth().user.NIC;

  /*this functions configures invisible recapcha to 
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

  useEffect(() => {
    setErrMsg("");
  }, [registrationNumber, chassisNumber, OTP, owner, vehicleMake, vehicleModel, vehicleType, fuel, fuelAllocationCategory, fuelAllocation]);

  useEffect(() => {
    setChecked((prev) => !prev);
  }, []);

  /*This handle submit funtion is called when submit button is hit */
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!registrationNumberStatus && !chassisNumberStatus) {
      console.log("verifying registrationNumber and chassisNumber");
      //call the api here to validate the vehicle has not been registered before
      const vehicleRegistered = await isVehicleRegistered({ registrationNumber: registrationNumber, chassisNumber: chassisNumber });

      if (vehicleRegistered.data.success) {
        // vehicle is not registered. Check for validity from DMT API
        const vehicleExists = await isVehicleReal({ registrationNumber: registrationNumber, chassisNumber: chassisNumber });

        if (vehicleExists.data.mobileNum !== "0") {
          const mobile = vehicleExists.data.mobileNum;
          //send the OTP here
          configureRecapcha();
          const phoneNumber = "+94" + mobile;
          const appVerifier = window.recaptchaVerifier;
          signInWithPhoneNumber(authentication, phoneNumber, appVerifier)
            .then((confirmationResult) => {
              // SMS sent. Prompt user to type the code from the message
              window.confirmationResult = confirmationResult;
              console.log("otp has been sent");
              setButtonText("Verify");
              setRegistrationNumberStatus(true);
              setChassisNumberStatus(true);              
            })
            .catch((error) => {
              setErrMsg("couldn't send the OTP!");
            });

          return;
        }
        return setErrMsg("Registration number or chassis number is invalid!");
      }
      return setErrMsg("Entered vehicle is already registered in the System!");
      
    } else if (!OTPStatus) {
      //validate the OTP here
      console.log("verifying OTP");
      const code = OTP;
      window.confirmationResult
        .confirm(code)
        .then(async (result) => {
          // OTP verified. Get vehicle details from DMT
          const vehicleDetails_Status = await getVehicleDetails({ registrationNumber: registrationNumber, chassisNumber: chassisNumber });

          // populate the form fields
          if (vehicleDetails_Status.data.success) {
            const vehicleDetails = vehicleDetails_Status.data.vehicle;
            setOwner(vehicleDetails.owner);
            setVehicleMake(vehicleDetails.make);
            setVehicleModel(vehicleDetails.model);
            setVehicleType(vehicleDetails.vehicleType);
            setFuel(vehicleDetails.fuelType);
            setFuelAllocationCategory(vehicleDetails.fuelAllocationCategory);
            setFuelAllocation(vehicleDetails.fuelAllocation);
            setOTPStatus(true);
            return;
          }
          return setErrMsg("Vehicle details retrival failed!");
        })
        .catch((error) => {
          setErrMsg("Wrong verification code!");
        });
      setButtonText("Register");
    } else {
      //register the vehicle
      const resOfReg = await registerVehicle({
        userNIC,
        registrationNumber,
        chassisNumber,
        owner,
        make: vehicleMake,
        model: vehicleModel,
        fuelType: fuel,
        vehicleType: fuelAllocationCategory,
        fuelAllocation
      });

      if (resOfReg.status===201){
        handleOpen();
        setTimeout(function () {
          return navigate('/customer/myVehicles');
        }, 3000);
      } else {
        setErrMsg("Vehicle Registration Failed");
        // setRegistrationNumberStatus(false);
        // setChassisNumberStatus(false);
        // setOTPStatus(false);        
      }

    }
  };

  /*this funtion validates the chassis number and returns
  true if it is valid, returns false otherwise */
  const validateChassisNumber = (value) => {
    if (value.length !== 17) {
      return false;
    }
    return true;
  };
  
  const validateRegistrationNumber = (value) => {
    return REGISTRATION_REGEX.test(value);
  };

  /*this function handles the changes of 
  registration number input field */
  const handleRegistrationNumberChange = (e) => {
    setRegistrationNumber(e.target.value);
    setRegistrationNumberValidity(validateRegistrationNumber(e.target.value));
  };

  const handleChassisNumberChange = (e) => {
    setChassisNumber(e.target.value);
    setChassisNumberValidity(validateChassisNumber(e.target.value));
  };

  return (
    <Box bgcolor="lightblue" flex={5} p={2} >
      <Box bgcolor="white" flex={5} p={3} sx={{ borderRadius: '9px' }}>
        <Slide
          direction={checked ? "up" : "down"}
          in={checked}
          mountOnEnter
          unmountOnExit
        >
          <div>
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
                    <DirectionsCar />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Register New Vehicle
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
                    sx={{ mt: 0 }}
                  >
                    <Modal
                      open={open}
                      onClose={handleClose}
                    >
                      <Box sx={style}>
                        <CheckCircle color="success" fontSize="large" position="center"/>
                        <Typography id="registration-success" mt={1} sx={{textAlign: "center"}}>
                          Vehicle registration successful. You will be redirected to the My Vehicles page.
                        </Typography>
                      </Box>
                    </Modal>
                    <Grid container>
                      <Grid item xs>
                        <TextField
                          required
                          fullWidth
                          id="registrationNumber"
                          label="Registration Number"
                          name="registrationNumber"
                          autoComplete="registrationNumber"
                          disabled={registrationNumberStatus ? true : false}
                          onChange={handleRegistrationNumberChange}
                          error={!registrationNumberValidity ? true : false}
                          autoFocus
                          margin="normal"
                        />
                        <TextField
                          required
                          fullWidth
                          id="chassisNumber"
                          label="Chassis Number"
                          name="chassisNumber"
                          autoComplete="chassisNumber"
                          disabled={chassisNumberStatus ? true : false}
                          error={!chassisNumberValidity ? true : false}
                          onChange={handleChassisNumberChange}
                          margin="normal"
                        />
                      </Grid>

                      {registrationNumberStatus && chassisNumberStatus && !OTPStatus ? (
                        <>
                          <Grid item xs={12}>
                            <p>An OTP was sent to the person which this vehicle is registered under.</p>
                            <p>Please check the phone of the vehicle owner for a text message.</p>
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
                      {OTPStatus?(
                      <Grid container mt={2} spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            id="owner"
                            label="Vehicle Owner"
                            name="owner"
                            value={owner}
                          />
                        </Grid>
                        <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="vehicleMake"
                            label="Vehicle Make"
                            name="vehicleMake"
                            value={vehicleMake}
                          />
                        </Grid>
                        <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="vehicleModel"
                            label="Vehicle Model"
                            name="vehicleModel"
                            value={vehicleModel}
                          />
                        </Grid>
                        <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="vehicleType"
                            label="Vehicle Type"
                            name="vehicleType"
                            value={vehicleType}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                              fullWidth
                              id="fuel"
                              label="Fuel Type"
                              name="fuel"
                              value={fuel}
                            />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            id="fuelAllocationCategory"
                            label="Fuel Allocation Category"
                            name="fuelAllocationCategory"
                            value={fuelAllocationCategory}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            id="fuelAllocation"
                            label="Fuel Allocation"
                            name="fuelAllocation"
                            value={fuelAllocation}
                          />
                        </Grid>
                      </Grid>
                      ):null}
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 2, mb: 2 }}
                      disabled={(
                        (!registrationNumberValidity || !registrationNumber || !chassisNumberValidity || !chassisNumber) || 
                        (registrationNumberStatus && chassisNumberStatus && !OTP))? true : false}
                    >
                      {buttonText}
                    </Button>
                    <div id="recapcha-container"></div>
                  </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
              </Container>
            </ThemeProvider>
          </div>
        </Slide>
      </Box>
    </Box>
  );
}

export default RegisterVehicleForm;

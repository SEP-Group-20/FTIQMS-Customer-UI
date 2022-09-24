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
import { Modal } from "@mui/material";

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
  
  const [buttonText, setButtonText] = useState("Register")

  const [checked, setChecked] = useState(true);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  useEffect(() => {
    setChecked((prev) => !prev);
  }, []);

  /*This handle submit funtion is called when submit button is hit */
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!registrationNumberStatus && !chassisNumberStatus) {
      //call the api here to validate the numbers and if valid get mobile number of the owner
      console.log("verifying registrationNumber and chassisNumber");
      setRegistrationNumberStatus(true);
      setChassisNumberStatus(true);
      //send the OTP here
      setButtonText("Verify");
      
    } else if (!OTPStatus) {
      //validate the OTP here
      console.log("verifying OTP");
      setOTPStatus(true);
      // call api an get vehcile details and populate the fields
      setButtonText("Register");
    }else{
      //api calls here
      console.log("Finally! done");
      handleOpen();
      setTimeout(function () {
        navigate('/customer/myVehicles');
      }, 3000);
    }
  };

  /*this funtion validates the NIC and returns
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
  NIC input field */
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
                            value="Thivindu Paranayapa"
                          />
                        </Grid>
                        <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="c"
                            label="Vehicle Make"
                            name="vehicleMake"
                            value="Toyota"
                          />
                        </Grid>
                        <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="vehicleModel"
                            label="Vehicle Model"
                            name="vehicleModel"
                            value="Axio"
                          />
                        </Grid>
                        <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="vehicleType"
                            label="Vehicle Type"
                            name="vehicleType"
                            value="Car"
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                              fullWidth
                              id="fuel"
                              label="Fuel Type"
                              name="fuel"
                              value="Petrol"
                            />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            id="fuelAllocationCategory"
                            label="Fuel Allocation Category"
                            name="fuelAllocationCategory"
                            value="Petrol vehicle"
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            id="fuelAllocation"
                            label="Fuel Allocation"
                            name="fuelAllocation"
                            value="20 liters"
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

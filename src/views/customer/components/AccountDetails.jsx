import React, { useEffect, useState } from 'react';
import Container  from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useAuth } from '../../../utils/auth';
import { getCustomerDetails } from '../../../services/CustomerServices';
import { Stack } from '@mui/system';
import { Alert, Divider, TextField } from '@mui/material';

const PWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

function AccountDetails() {

  const [customerDetails, setCustomerDetails] = useState([]);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [validNewPassword, setValidNewPassword] = useState(true);
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  
  const {auth} = useAuth();
  
  const userNIC = auth().user.NIC; // get the NIC of the logged in customer
  
  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };
  
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmNewPasswordChange = (e) => {
    setConfirmNewPassword(e.target.value);
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("oldPassword",oldPassword);
    console.log("newPassword",newPassword);
    console.log("confirmNewPassword",confirmNewPassword);
  };

  // get details of the customer
  useEffect(() => {
    async function fetchCustomerDetails() {
      const customerDetails = await getCustomerDetails({userNIC: userNIC});
      
      if (customerDetails.data.success)
        setCustomerDetails(customerDetails.data.customerDetails);
      else
        setErrMsg("Customer details retrival failed!");
    }
  
    fetchCustomerDetails();
  }, [userNIC]);

  // function to get the relevant details of the fuel station and create the grids for each fuel station
  const customerFuelStations = customerDetails.fuelStations?.map((fuelStation)=>{
    // create the grid with the relevant details
    return (
      <Grid key={fuelStation} item xs={12} md={8} sx={{fontSize: '1.2rem', marginBottom: 1}}>
        {fuelStation}
      </Grid>
    );
  });

  return (
    <Box bgcolor="#d1cebd" flex={5} p={2} >
      <Box bgcolor="white" flex={5} p={3} sx={{ borderRadius: '9px' }}>
        {errMsg !== "" ? (
          // error
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="error">{errMsg}</Alert>
          </Stack>
        ) : 
          // if no error display the detials of the customer
          <>
            <Grid container spacing={3} marginLeft={0} marginTop={0}>

              <Grid item xs={12} md={4} sx={{fontSize: '1.3rem', fontWeight: 'bold'}}>
                First Name
              </Grid>
              <Grid item xs={12} md={8} sx={{fontSize: '1.2rem'}}>
                {customerDetails.firstName}
              </Grid>

              <Grid item xs={12} md={4} sx={{fontSize: '1.3rem', fontWeight: 'bold'}}>
                Last Name
              </Grid>
              <Grid item xs={12} md={8} sx={{fontSize: '1.2rem'}}>
                {customerDetails.lastName} 
              </Grid>

              <Grid item xs={12} md={4} sx={{fontSize: '1.3rem', fontWeight: 'bold'}}>
                NIC Number
              </Grid>
              <Grid item xs={12} md={8} sx={{fontSize: '1.2rem'}}>
                {customerDetails.NIC}
              </Grid>

              <Grid item xs={12} md={4} sx={{fontSize: '1.3rem', fontWeight: 'bold'}}>
                Mobile
              </Grid>
              <Grid item xs={12} md={8} sx={{fontSize: '1.2rem'}}>
                {customerDetails.mobile}
              </Grid>

              <Grid item xs={12} md={4} sx={{fontSize: '1.3rem', fontWeight: 'bold'}}>
                Fuel Stations
              </Grid>
              <Grid item xs={12} md={8}>
                {customerFuelStations}
              </Grid>

            </Grid>
            
            <Divider sx={{marginTop: 2}}/>

            <Grid container marginLeft={0} marginTop={0}>
              <Grid item xs={12} md={12} sx={{fontSize: '1.3rem', fontWeight: 'bold', marginTop: 2}}>
                Reset Password
              </Grid>

              <Grid item xs>
                <TextField
                  required
                  fullWidth
                  id="oldPassword"
                  label="Old Password"
                  name="oldPassword"
                  autoComplete="oldPassword"
                  onChange={handleOldPasswordChange}
                  margin="normal"
                />
                <TextField
                  required
                  fullWidth
                  id="newPassword"
                  label="New Password"
                  name="newPassword"
                  autoComplete="newPassword"
                  onChange={handleNewPasswordChange}
                  margin="normal"
                />
                <TextField
                  required
                  fullWidth
                  id="confirmNewPassword"
                  label="Confirm New Password"
                  name="confirmNewPassword"
                  autoComplete="confirmNewPassword"
                  onChange={handleConfirmNewPasswordChange}
                  margin="normal"
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 2, mb: 2}}
                  onClick={handleSubmit}
                >
                  Change Password
                </Button>
              </Grid>
            </Grid>
          </>
        }
      </Box>
    </Box>
  );
}

export default AccountDetails;

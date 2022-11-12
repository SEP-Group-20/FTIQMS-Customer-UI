import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Box, Stack } from '@mui/system';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid} from '@mui/material';
import { useParams } from 'react-router-dom';
import { getVehicleDetails } from '../../services/vehicleServices';
import { Delete } from '@mui/icons-material';
import { useAuth } from '../../utils/auth';
import Topbar from './components/Topbar';

function VehicleDetails() {
  const { vid } = useParams();
  const [vehicleDetails, setVehicleDetails] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [open, setOpen] = useState(false);

  const {auth} = useAuth();

  const userNIC = auth().user.NIC; // get the NIC of the logged in customer

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // get details of the registered vehicles of the customer
  useEffect(() => {
    async function fetchVehicleDetails() {
      const vehicleDetails_Status = await getVehicleDetails(vid, {userNIC: userNIC});
      
      if (vehicleDetails_Status.data.success)
        setVehicleDetails(vehicleDetails_Status.data.vehicle);
      else
        setErrMsg("Vehicle details retrival failed!");
    }

    fetchVehicleDetails();
  }, [vid, userNIC]);

  // display the detials of the vehicle, error messages and the vehicle removal confirmation popup
  return (
    <Box display="flex" flexDirection="column" sx={{minHeight: '100vh'}}>
      <Navbar/>
      <Stack direction="row" justifyContent="space-between" flex={1} overflow="auto">
        <Sidebar />
          <Stack direction="column" justifyContent="space-between" flex={1} overflow="auto">
            <Topbar heading="Vehicles Details" goto="/customer/myVehicles"/>
            {/* vehicle list */}
            <Box bgcolor="#d1cebd" flex={5} p={2} >
              <Box bgcolor="white" flex={5} p={3} sx={{ borderRadius: '9px' }}>
                {errMsg !== "" ? (
                  // error
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">{errMsg}</Alert>
                  </Stack>
                ) : 
                  // if no error display the detials of the vehicle
                  <>
                    <Grid container spacing={3} marginLeft={0} marginTop={0}>

                      <Grid item xs={12} md={6} sx={{fontSize: '1.3rem', fontWeight: 'bold'}}>
                        Registration Number
                      </Grid>
                      <Grid item xs={12} md={6} sx={{fontSize: '1.2rem'}}>
                        {vehicleDetails.registrationNumber}
                      </Grid>

                      <Grid item xs={12} md={6} sx={{fontSize: '1.3rem', fontWeight: 'bold'}}>
                        Chassis Number
                      </Grid>
                      <Grid item xs={12} md={6} sx={{fontSize: '1.2rem'}}>
                        {vehicleDetails.chassisNumber}
                      </Grid>
                      
                      <Grid item xs={12} md={6} sx={{fontSize: '1.3rem', fontWeight: 'bold'}}>
                        Vehicle Make
                      </Grid>
                      <Grid item xs={12} md={6} sx={{fontSize: '1.2rem'}}>
                        {vehicleDetails.make}
                      </Grid>

                      <Grid item xs={12} md={6} sx={{fontSize: '1.3rem', fontWeight: 'bold'}}>
                        Vehicle Model
                      </Grid>
                      <Grid item xs={12} md={6} sx={{fontSize: '1.2rem'}}>
                        {vehicleDetails.model}
                      </Grid>

                      <Grid item xs={12} md={6} sx={{fontSize: '1.3rem', fontWeight: 'bold'}}>
                        Vehicle Owner
                      </Grid>
                      <Grid item xs={12} md={6} sx={{fontSize: '1.2rem'}}>
                        {vehicleDetails.owner}
                      </Grid>

                      <Grid item xs={12} md={6} sx={{fontSize: '1.3rem', fontWeight: 'bold'}}>
                        Fuel
                      </Grid>
                      <Grid item xs={12} md={6} sx={{fontSize: '1.2rem'}}>
                        {vehicleDetails.fuelType}
                      </Grid>

                      <Grid item xs={12} md={6} sx={{fontSize: '1.3rem', fontWeight: 'bold'}}>
                        Vehicle Type
                      </Grid>
                      <Grid item xs={12} md={6} sx={{fontSize: '1.2rem'}}>
                        {vehicleDetails.vehicleType}
                      </Grid>

                      <Grid item xs={12} md={6} sx={{fontSize: '1.3rem', fontWeight: 'bold'}}>
                        Requested Fuel
                      </Grid>
                      <Grid item xs={12} md={6} sx={{fontSize: '1.2rem'}}>
                        {vehicleDetails.isQueued? "Yes": "No"}
                      </Grid>

                      <Grid item xs={12} md={6} sx={{fontSize: '1.3rem', fontWeight: 'bold'}}>
                        Number of Fuel Availability Notifications Sent
                      </Grid>
                      <Grid item xs={12} md={6} sx={{fontSize: '1.2rem'}}>
                        {vehicleDetails.notificationsSent}
                      </Grid>

                    </Grid>

                    {/* remove vehicle button */}
                    <Box textAlign='center' mt={4}>
                      <Button variant="outlined" color="error" m={4} startIcon={<Delete />} onClick={handleClickOpen}>
                        Remove Vehicle
                      </Button>
                    </Box>

                    {/* vehicle removal popup when the remove vehicle button is clicked */}
                    <Dialog
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title" color="red">
                        {"Remove Vehicle from your account?"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description" color="red">
                          If you remove the vehicle from your account, the fuel allocation will be reduced and
                          the vehicle will be removed from any fuel queues that it is currenly assigned to.
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button variant="contained" color="error" onClick={handleClose}>Remove</Button>
                        <Button variant="contained" onClick={handleClose} autoFocus>
                          Cancel
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </>
                }
                
              </Box>
            </Box>
          </Stack>

      </Stack>
    </Box>
  )
}

export default VehicleDetails;
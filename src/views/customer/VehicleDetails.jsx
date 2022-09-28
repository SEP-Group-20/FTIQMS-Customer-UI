import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Box, Stack } from '@mui/system';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, ListItem, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getVehicleDetails } from '../../services/vehicleServices';
import { Delete } from '@mui/icons-material';
import { useAuth } from '../../utils/auth';

function VehicleDetails() {
  const { vid } = useParams();
  const [vehicleDetails, setVehicleDetails] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [open, setOpen] = useState(false);

  const {auth} = useAuth();

  const userNIC = auth().user.NIC;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  return (
    <Box display="flex" flexDirection="column" sx={{minHeight: '100vh'}}>
      <Navbar/>
      <Stack direction="row" justifyContent="space-between" flex={1} overflow="auto">
        <Sidebar />
        <Box bgcolor="lightblue" flex={5} p={2} >
          <Box bgcolor="white" flex={5} p={3} sx={{ borderRadius: '9px' }}>
            {errMsg !== "" ? (
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity="error">{errMsg}</Alert>
              </Stack>
            ) : 
              <>
                <List>
                  <ListItem>
                    <Typography variant='h6' display="inline" width="50%">
                      Registration Number :
                    </Typography>
                    <Typography display="inline">
                      {vehicleDetails.registrationNumber}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography variant='h6' display="inline" width="50%">
                      Chassis Number :
                    </Typography>
                    <Typography display="inline">
                      {vehicleDetails.chassisNumber}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography variant='h6' display="inline" width="50%">
                      Vehicle Make :
                    </Typography>
                    <Typography display="inline">
                      {vehicleDetails.make}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography variant='h6' display="inline" width="50%">
                      Vehicle Model :
                    </Typography>
                    <Typography display="inline">
                      {vehicleDetails.model}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography variant='h6' display="inline" width="50%">
                      Vehicle Owner :
                    </Typography>
                    <Typography display="inline">
                      {vehicleDetails.owner}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography variant='h6' display="inline" width="50%">
                      Fuel :
                    </Typography>
                    <Typography display="inline">
                      {vehicleDetails.fuelType}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography variant='h6' display="inline" width="50%">
                      Vehicle Type :
                    </Typography>
                    <Typography display="inline">
                      {vehicleDetails.vehicleType}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography variant='h6' display="inline" width="50%">
                      Requested Fuel :
                    </Typography>
                    <Typography display="inline">
                      {vehicleDetails.isQueued? "Yes": "No"}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography variant='h6' display="inline" width="50%">
                      Number of Fuel Availability Notifications Sent :
                    </Typography>
                    <Typography display="inline">
                      {vehicleDetails.notificationsSent}
                    </Typography>
                  </ListItem>
                </List>
                <Box textAlign='center' mt={4}>
                  <Button variant="outlined" color="error" m={4} startIcon={<Delete />} onClick={handleClickOpen}>
                    Remove Vehicle
                  </Button>
                </Box>

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
    </Box>
  )
}

export default VehicleDetails;
import { AddCircle, LocalGasStation } from '@mui/icons-material';
import { Alert, AlertTitle, Box, Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getAllRegisteredVehicleDetails, getRemainingFuel } from '../../../services/CustomerServices';
import { useAuth } from '../../../utils/auth'

function RequestFuelVehicleList() {
  const [vehicleDetails, setVehicleDetails] = useState([]);
  const [fuelDetails, setFuelDetails] = useState([]);
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

  const setDisabled = (fuelType, fuelRequested) => {
    if (fuelDetails[fuelType] <= 0 || fuelRequested)
      return true;
    return false;
  }

  const buttonText = (fuelType, fuelRequested) => {
    if (fuelDetails[fuelType] <= 0)
      return "Fuel Quota exhausted";

    if (fuelRequested)
      return "Fuel Already Requested";

    return "Request Fuel";
  }

  useEffect(() => {
    async function fetchAllVehicleDetails() {
      const allRegisteredVehicleDetails = await getAllRegisteredVehicleDetails({userNIC: userNIC});
      
      if (allRegisteredVehicleDetails.data.success)
        setVehicleDetails(allRegisteredVehicleDetails.data.allRegisteredVehicleDetails);
      else
        setErrMsg("Vehicle details retrival failed!");
    }

    fetchAllVehicleDetails();
  }, [userNIC]);

  useEffect(() => {
    async function fetchFuelStatus() {
      const fuelStatus = await getRemainingFuel({userNIC: userNIC});
      
      if (fuelStatus.data.success)
        setFuelDetails(fuelStatus.data.fuel);
      else
        setErrMsg("Fuel status retrival failed!");
    }

    fetchFuelStatus();
  }, [userNIC]);

  const vehicleDetailCards = vehicleDetails.map( (vehicle)=>{
    // const vid = vehicle._id.toString();
    const registrationNumber = vehicle.registrationNumber;
    const make_model = vehicle.make + " " + vehicle.model;
    const fuelRequested = vehicle.isQueued;
    const fuelType = vehicle.fuelType;

    return (
      <Card variant="outlined"  sx={{ minWidth: 275, marginBottom: 2, backgroundColor: "#f5f4f0"}}>
        <CardContent sx={{ paddingBottom: 0}} >
          <Typography variant="h4" component="div">
            {registrationNumber}
          </Typography>
          <Typography variant="h6">
            {make_model}
          </Typography>
        </CardContent>
        <CardActions sx={{paddingX: 2, display:"flex", justifyContent:"flex-end", alignItems:"flex-end"}}>
          <Button 
            variant="contained" 
            sx={{
              background: "#ff5722",
              '&:hover': {backgroundColor: '#ff3c00'}
            }}
            m={4}
            startIcon={<LocalGasStation />}
            onClick={handleClickOpen}
            disabled={setDisabled(fuelType, fuelRequested)}
          >
            {buttonText(fuelType, fuelRequested)}
          </Button>
        </CardActions>
      </Card>
    );
  })

  return (
    <Box bgcolor="#d1cebd" flex={5} p={2} >
      <Typography variant='h2' mb={3} sx={{ display: "flex", justifyContent: "center"}}>
        Request Fuel from Vehicle
      </Typography>
      {vehicleDetails.length === 0 ?
        <Alert severity="warning" sx={{margin:"Auto", maxWidth: "75%"}}>
          <AlertTitle>No Registered vehicles</AlertTitle>
            <Box sx={{display: "flex", gap: "5px", alignItems: "center"}}>
              <Typography variant="p" color="initial">Click the</Typography>
              <AddCircle />
              <Typography variant="p" color="initial"> button in My Vehicles to add vehicles to the account!</Typography>
            </Box>
        </Alert>
      : null}
      {errMsg !== "" ? (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">{errMsg}</Alert>
        </Stack>
      ) : 
        <>
          {vehicleDetailCards}
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
            {"Request Fuel From Vehicle?"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                If you request fuel from this vehicle it will be added to a fuel queue
                in one of your preferred fuel stations.
                You will receive a notification when fuel is available.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button variant="contained" color="success" onClick={handleClose}>Request</Button>
            <Button variant="contained" onClick={handleClose} autoFocus>
                Cancel
            </Button>
            </DialogActions>
          </Dialog>
        </>
      }
    </Box>
  )
}

export default RequestFuelVehicleList
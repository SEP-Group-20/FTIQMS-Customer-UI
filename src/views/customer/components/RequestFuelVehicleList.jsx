import { AddCircle, CheckCircle, LocalGasStation } from '@mui/icons-material';
import { Alert, AlertTitle, Box, Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getAllRegisteredVehicleDetails, getRemainingFuel } from '../../../services/CustomerServices';
import { assignVehicleToFuelQueue } from '../../../services/vehicleServices';
import { useAuth } from '../../../utils/auth';

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

function RequestFuelVehicleList() {
  const [vehicleDetails, setVehicleDetails] = useState([]);
  const [fuelRequestVehicle, setFuelRequestVehicle] = useState("");
  const [fuelDetails, setFuelDetails] = useState([]);
  const [requestedFuel, setRequestedFuel] = useState({});
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false)
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  
  const {auth} = useAuth();

  const userNIC = auth().user.NIC; // get the NIC of the logged in customer

  const handleClose = () => setOpen(false);

  const handleClickOpen = (e) => {
    setFuelRequestVehicle(e.target.id);
    setOpen(true);
  };

  const handleFuelRequest = async () => {
    // send fuel request to backend
    const result = await assignVehicleToFuelQueue({fuelRequestVehicle: fuelRequestVehicle, userNIC: userNIC});
    if (!result.data.success)
      setErrMsg(result.data.message)
    else {
      setSuccess(true);
      setModalOpen(true);
      setTimeout(function () {
        setSuccess(false);
        setModalOpen(false);
      }, 2000);
    }
      
    setFuelRequestVehicle("")
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  // set the status of the fuel request button
  const setDisabled = (fuelType, fuelRequested) => {
    // check if fuel already requested or fuel allocation for that fuel is exhausted
    if (fuelDetails[fuelType] <= 0 || fuelRequested || requestedFuel[fuelType])
      return true; // fuel already requested or fuel allocation for that fuel is exhausted
    return false; // can request fuel
  }

  // set the text of the fuel request button
  const buttonText = (fuelType, fuelRequested) => {

    // if fuel allocation for that fuel is exhausted
    if (fuelDetails[fuelType] <= 0)
      return "Fuel Quota exhausted";

    // if fuel already requested
    if (fuelRequested || requestedFuel[fuelType])
      return "Fuel Already Requested";

    // can request fuel
    return "Request Fuel";
  }

  // get details of all the registered vehicles of the customer
  useEffect(() => {
    async function fetchAllVehicleDetails() {
      const allRegisteredVehicleDetails = await getAllRegisteredVehicleDetails({userNIC: userNIC});
      
      if (allRegisteredVehicleDetails.data.success)
        setVehicleDetails(allRegisteredVehicleDetails.data.allRegisteredVehicleDetails);
      else
        setErrMsg("Vehicle details retrival failed!");
    }

    fetchAllVehicleDetails();
  }, [userNIC, success]);

  // set details of requested fuels of the customer
  useEffect(() => {
    let updatedValue = {};
    vehicleDetails.forEach(vehicle => {
      const fuel = vehicle.fuelType
      updatedValue[fuel] = updatedValue[fuel] || vehicle.isQueued;
    });

    setRequestedFuel(updatedValue)
  }, [vehicleDetails]);

  // get fuel allocation status of the customer
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

  // function to get the relevant details of the vehicle and create the cards for each vehicle
  const vehicleDetailCards = vehicleDetails.map( (vehicle)=>{
    const registrationNumber = vehicle.registrationNumber; // get the registration number of the vehicle
    const make_model = vehicle.make + " " + vehicle.model; // get the make and model of the vehicle
    const fuelRequested = vehicle.isQueued; // get the fuel requested status of the vehicle
    const fuelType = vehicle.fuelType; // get the fuel type of the vehicle

    // create the card with the relevant details
    return (
      <Card variant="outlined"  sx={{ minWidth: 275, marginBottom: 2, backgroundColor: "#f5f4f0"}} key={registrationNumber}>
        <CardContent sx={{ paddingBottom: 0}} >
          <Typography variant="h4" component="div">
            {registrationNumber}
          </Typography>
          <Typography variant="h6">
            {make_model}
          </Typography>
        </CardContent>
        {/* button to request fuel from the vehicle*/}
        <CardActions sx={{paddingX: 2, display:"flex", justifyContent:"flex-end", alignItems:"flex-end"}}>
          <Button 
            variant="contained" 
            sx={{
              background: "#ff5722",
              '&:hover': {backgroundColor: '#ff3c00'}
            }}
            m={4}
            startIcon={<LocalGasStation />}
            id = {registrationNumber}
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
      <Modal
        open={modalOpen}
        onClose={handleClose}
      >
        <Box sx={style}>
          <CheckCircle color="success" fontSize="large" position="center"/>
          <Typography id="registration-success" mt={1} sx={{textAlign: "center"}}>
            Fuel Request successful.
          </Typography>
        </Box>
      </Modal>
      {/* display alert if not vehicles are registered in the account of the customer */}
      {vehicleDetails.length === 0 ?
        // no registered vehicles in the account of the customer
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
        // error
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">{errMsg}</Alert>
        </Stack>
      ) : 
        <>
          {/* display all the details of the registered vehicles of the cusotmer in individual cards */}
          {vehicleDetailCards}
          {/* reuqest fuel from vehicle popup when the request fuel button is clicked */}
          <Dialog
            open={open}
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
              <Button variant="contained" color="success" onClick={handleFuelRequest}>Request</Button>
              <Button variant="contained" onClick={handleCancel} autoFocus>Cancel</Button>
            </DialogActions>
          </Dialog>
        </>
      }
    </Box>
  )
}

export default RequestFuelVehicleList
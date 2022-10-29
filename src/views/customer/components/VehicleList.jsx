import { AddCircle } from '@mui/icons-material';
import { Alert, AlertTitle, Box, Button, Card, CardActions, CardContent, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getAllRegisteredVehicleDetails } from '../../../services/CustomerServices';
import { useAuth } from '../../../utils/auth'

function VehicleList() {
  const [vehicleDetails, setVehicleDetails] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const {auth} = useAuth();

  const userNIC = auth().user.NIC; // get the NIC of the logged in customer

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
  }, [userNIC]);

  // function to get the relevant details of the vehicle and create the cards for each vehicle
  const vehicleDetailCards = vehicleDetails.map((vehicle)=>{

    const vid = vehicle._id.toString(); // get the vehicle id of the vehicle
    const registrationNumber = vehicle.registrationNumber; // get the registration number of the vehicle
    const make_model = vehicle.make + " " + vehicle.model; // get the make and model of the vehicle

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
        {/* button to view the details of the vehicle with the vehicle id as a url parameter*/}
        <CardActions sx={{ paddingY: 0}}>
          <Button component="a" href={`/customer/viewVehicle/${vid}`} sx={{color: "#ff5722"}}>View Details</Button>
        </CardActions>
      </Card>
    );

  });

  return (
    <Box bgcolor="#d1cebd" flex={5} p={2} >
      {/* display alert if not vehicles are registered in the account of the customer */}
      {vehicleDetails.length === 0 ?
        // no registered vehicles in the account of the customer
        <Alert severity="warning" sx={{margin:"Auto", maxWidth: "75%"}}>
          <AlertTitle>No Registered vehicles</AlertTitle>
            <Box sx={{display: "flex", gap: "5px", alignItems: "center"}}>
              <Typography variant="p" color="initial">Click the</Typography>
              <AddCircle />
              <Typography variant="p" color="initial"> button to add vehicles to the account!</Typography>
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
        </>
      }
    </Box>
  )
}

export default VehicleList
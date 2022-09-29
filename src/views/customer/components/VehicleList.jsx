import { AddCircle } from '@mui/icons-material';
import { Alert, AlertTitle, Box, Button, Card, CardActions, CardContent, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getAllRegisteredVehicleDetails } from '../../../services/CustomerServices';
import { useAuth } from '../../../utils/auth'

function VehicleList() {
  const [vehicleDetails, setVehicleDetails] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const {auth} = useAuth();

  const userNIC = auth().user.NIC;

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

  const vehicleDetailCards = vehicleDetails.map((vehicle)=>{

    const vid = vehicle._id.toString();
    const registrationNumber = vehicle.registrationNumber;
    const make_model = vehicle.make + " " + vehicle.model;

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
        <CardActions sx={{ paddingY: 0}}>
          <Button component="a" href={`/customer/viewVehicle/${vid}`} sx={{color: "#ff5722"}}>View Details</Button>
        </CardActions>
      </Card>
    );

  });

  return (
    <Box bgcolor="#d1cebd" flex={5} p={2} >
      <Typography variant='h2' mb={3} sx={{ display: "flex", justifyContent: "center"}}>
        Registered Vehicles
      </Typography>
      {vehicleDetails.length === 0 ?
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
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">{errMsg}</Alert>
        </Stack>
      ) : 
        <>
          {vehicleDetailCards}
        </>
      }
    </Box>
  )
}

export default VehicleList
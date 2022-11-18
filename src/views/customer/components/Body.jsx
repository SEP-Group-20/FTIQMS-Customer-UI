import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getDashboardDetails } from '../../../services/CustomerServices';
import { getUserName } from '../../../services/UserService';
import { useAuth } from '../../../utils/auth';

let curr = new Date(); // get current date
let last = curr.getDate() - curr.getDay() +7; // last day is the day of the month - the day of the week + 7
let lastday = new Date(curr.setDate(last))
let month = lastday.getUTCMonth() + 1; //months from 1-12
let day = lastday.getUTCDate();
let year = lastday.getUTCFullYear();

const newdate = year + "/" + month + "/" + day;

const Body = () => {
  const [username, setUsername] = useState("");
  const [dashBoardDetails, setDashBoardDetails] = useState(null);

  const {auth} = useAuth();

  const userNIC = auth().user.NIC;

  useEffect(() => {
    async function fetchUserDetails() {
      const userDetails = await getUserName({userNIC: userNIC});
      setUsername(userDetails.data.user.firstName + " " + userDetails.data.user.lastName );
      const dashboardDetails = await getDashboardDetails({userNIC: userNIC});
      setDashBoardDetails(dashboardDetails.data.customerDetails);
    }
    fetchUserDetails();
  }, [userNIC]);

  return (
    <Box bgcolor="#d1cebd" flex={5} p={2} >
      <Typography variant='h3' sx={{ display: "flex", justifyContent: "center"}}>
        Welcome
      </Typography>
      <Typography variant='h3' sx={{ display: "flex", justifyContent: "center", marginBottom: 2}}>
        {username}
      </Typography>

      {dashBoardDetails !== null ? 
        <Grid container>

          <Grid item xs={12} md={6} sx={{fontSize: '1.3rem', fontWeight: 'bold'}}>
            <Card variant="outlined"  sx={{margin: 2, backgroundColor: "#f5f4f0"}} key="Petrol">
              <CardContent sx={{ paddingBottom: 0}} >
                <Typography variant="h4" component="div">
                  Petrol
                </Typography>
                <Typography variant="h6">
                  Allocation: {dashBoardDetails.Petrol.fuelAllocation} L
                </Typography>
                <Typography variant="h6">
                  Remaining: {dashBoardDetails.Petrol.remainingFuel} L
                </Typography>
                <Typography marginTop={2} sx={{ display: "flex", justifyContent: "flex-end"}}>
                  Resets On: {newdate} at 23.55
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card variant="outlined"  sx={{margin: 2, backgroundColor: "#f5f4f0"}} key="Petrol">
              <CardContent>
                <Typography variant="h4" component="div">
                  Diesel
                </Typography>
                <Typography variant="h6">
                  Allocation: {dashBoardDetails.Diesel.fuelAllocation} L
                </Typography>
                <Typography variant="h6">
                  Remaining: {dashBoardDetails.Diesel.remainingFuel} L
                </Typography>
                <Typography marginTop={2} sx={{ display: "flex", justifyContent: "flex-end"}}>
                  Resets On: {newdate} at 23.55
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={12}>
            <Card variant="outlined"  sx={{margin: 2, backgroundColor: "#f5f4f0"}} key="Petrol">
              <CardContent>
                <Typography variant="h5">
                  {dashBoardDetails.Petrol.isQueued && dashBoardDetails.Petrol.notificationsSent ? 
                  "Vehicle is queued and has received notifications for Petrol" :
                  dashBoardDetails.Petrol.isQueued && !dashBoardDetails.Petrol.notificationsSent ?
                  "Petrol is requested but not yet notified" :
                  "Petrol not requested" }
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={12}>
            <Card variant="outlined"  sx={{margin: 2, backgroundColor: "#f5f4f0"}} key="Diesel">
              <CardContent>
                <Typography variant="h5">
                {dashBoardDetails.Diesel.isQueued && dashBoardDetails.Diesel.notificationsSent ? 
                  "Vehicle is queued and has received notifications for Diesel" :
                  dashBoardDetails.Diesel.isQueued && !dashBoardDetails.Diesel.notificationsSent ?
                  "Diesel is requested but not yet notified" :
                  "Diesel not requested" }
                </Typography>
              </CardContent>
            </Card>
          </Grid>

        </Grid>
      : null }
    </Box>
  )
}

export default Body
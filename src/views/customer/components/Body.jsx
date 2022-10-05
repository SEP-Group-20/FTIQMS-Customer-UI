import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getUserName } from '../../../services/UserService';
import { useAuth } from '../../../utils/auth';

const Body = () => {
  const [username, setUsername] = useState("");

  const {auth} = useAuth();

  const userNIC = auth().user.NIC;

  useEffect(() => {
    async function fetchusername() {
      const userDetails = await getUserName({userNIC: userNIC});
      setUsername(userDetails.data.user.firstName + " " + userDetails.data.user.lastName );
    }
    fetchusername();
  }, [userNIC]);

  return (
    <Box bgcolor="#d1cebd" flex={5} p={2} >
      <Typography variant='h2' sx={{ display: "flex", justifyContent: "center"}}>
        Welcome
      </Typography>
      <Typography variant='h2' sx={{ display: "flex", justifyContent: "center"}}>
        {username}
      </Typography>
    </Box>
  )
}

export default Body
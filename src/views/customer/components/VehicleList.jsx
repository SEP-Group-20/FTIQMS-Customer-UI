import { Box, Typography } from '@mui/material'
import React from 'react'
import { useAuth } from '../../../utils/auth'

const VehicleList = () => {
  const {auth} = useAuth();

  console.log(auth());

  return (
    <Box bgcolor="lightblue" flex={5} p={2} >
      <Typography variant='h1' sx={{ display: "flex", justifyContent: "center"}}>
        Vehicle List
      </Typography>
    </Box>
  )
}

export default VehicleList
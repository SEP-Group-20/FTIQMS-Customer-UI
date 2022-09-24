import { Box, Typography } from '@mui/material'
import React from 'react'

const VehicleList = () => {
  return (
    <Box bgcolor="lightblue" flex={5} p={2} >
      <Typography variant='h1' sx={{ display: "flex", justifyContent: "center"}}>
        Vehicle List
      </Typography>
    </Box>
  )
}

export default VehicleList
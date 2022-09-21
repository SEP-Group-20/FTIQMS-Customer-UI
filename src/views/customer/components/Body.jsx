import { Box, Typography } from '@mui/material'
import React from 'react'

const Body = () => {
  return (
    <Box bgcolor="lightblue" flex={5} p={2} >
      <Typography variant='h1' sx={{ display: "flex", justifyContent: "center"}}>
        Welcome
        Customer
      </Typography>
    </Box>
  )
}

export default Body
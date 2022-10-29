import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import VehicleList from './components/VehicleList';
import { Box, Stack } from '@mui/system';
import { Fab, Tooltip } from '@mui/material';
import { Add } from '@mui/icons-material';
import Topbar from './components/Topbar';

const MyVehicles = () => {
  return (
    <Box display="flex" flexDirection="column" sx={{minHeight: '100vh'}}>
      <Navbar/>
      <Stack direction="row" justifyContent="space-between" flex={1} overflow="auto">
        <Sidebar />
        <Stack direction="column" justifyContent="space-between" flex={1} overflow="auto">
          <Topbar heading="My Vehicles" goto="/customer/home"/>
          {/* vehicle list */}
          <VehicleList />
        </Stack>
      </Stack>
      <div>
        {/* add vehicle button */}
        <Tooltip title="Add Vehicle" sx={{position: "fixed", bottom: 20, right: 20, background: "#ff5722", '&:hover': {backgroundColor: '#ff3c00'}}}>
          <Fab color="primary" aria-label="add" component="a" href="/customer/registerVehicle">
            <Add />
          </Fab>
        </Tooltip>
      </div>
    </Box>
  )
}

export default MyVehicles
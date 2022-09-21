import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Body from './components/Body';
import { Box, Stack } from '@mui/system';

const CustomerHome = () => {
  return (
    <Box>
      <Navbar/>
      <Stack direction="row" justifyContent="space-between">
        <Sidebar />
        <Body />
      </Stack>
    </Box>
  )
}

export default CustomerHome
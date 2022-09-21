import { AccountBox, DirectionsCar, Home, LocalGasStation, QrCode } from '@mui/icons-material'
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'

const Sidebar = () => {
  return (
    <Box bgcolor="darkorange" flex={1} p={2} >
      <List>
        <ListItem disablePadding>
          <ListItemButton component="a" href="/">
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="/">
            <ListItemIcon>
              <DirectionsCar />
            </ListItemIcon>
            <ListItemText primary="My Vehicles" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="/">
            <ListItemIcon>
              <LocalGasStation />
            </ListItemIcon>
            <ListItemText primary="Request Fuel" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="/">
            <ListItemIcon>
              <QrCode />
            </ListItemIcon>
            <ListItemText primary="QR Code" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="/">
            <ListItemIcon>
              <AccountBox />
            </ListItemIcon>
            <ListItemText primary="Account" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )
}

export default Sidebar
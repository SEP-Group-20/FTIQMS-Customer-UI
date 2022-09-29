import {
  AccountBox,
  DirectionsCar,
  Home,
  LocalGasStation,
  QrCode,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";

const Sidebar = () => {
  return (
    <Box bgcolor="#f57b51" flex={1} p={2}>
      <List>
        <ListItem disablePadding>
          <ListItemButton component="a" href="/customer/home">
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <Divider component="li" />
        <ListItem disablePadding>
          <ListItemButton component="a" href="/customer/myVehicles">
            <ListItemIcon>
              <DirectionsCar />
            </ListItemIcon>
            <ListItemText primary="My Vehicles" />
          </ListItemButton>
        </ListItem>
        <Divider component="li" />
        <ListItem disablePadding>
          <ListItemButton component="a" href="/customer/requestFuel">
            <ListItemIcon>
              <LocalGasStation />
            </ListItemIcon>
            <ListItemText primary="Request Fuel" />
          </ListItemButton>
        </ListItem>
        <Divider component="li" />
        <ListItem disablePadding>
          <ListItemButton component="a" href="/customer/qrcode">
            <ListItemIcon>
              <QrCode />
            </ListItemIcon>
            <ListItemText primary="QR Code" />
          </ListItemButton>
        </ListItem>
        <Divider component="li" />
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
  );
};

export default Sidebar;

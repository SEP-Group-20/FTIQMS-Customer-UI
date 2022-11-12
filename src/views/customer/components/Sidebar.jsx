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
  styled,
} from "@mui/material";
import React from "react";
import EditLocationIcon from '@mui/icons-material/EditLocation';

const FullSideBar = styled(Box)(({ theme }) => ({
  display: "none",
  backgroundColor: "#f57b51",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const IconSidebar = styled(Box)(({ theme }) => ({
  display: "flex",
  backgroundColor: "#f57b51",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

const Sidebar = () => {
  return (
    <Box p={2} bgcolor="#f57b51">
      <Box>
        <FullSideBar>
          <List sx={{paddingY: 0}}>
            {/* home button */}
            <ListItem disablePadding>
              <ListItemButton component="a" href="/customer/home">
                <ListItemIcon>
                  <Home/>
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            <Divider component="li" />
            {/* my vehicles button - to view the all registered vehicles */}
            <ListItem disablePadding>
              <ListItemButton component="a" href="/customer/myVehicles">
                <ListItemIcon>
                  <DirectionsCar />
                </ListItemIcon>
                <ListItemText primary="My Vehicles" />
              </ListItemButton>
            </ListItem>
            <Divider component="li" />
            {/* button to request fuel form a vehicle */}
            <ListItem disablePadding>
              <ListItemButton component="a" href="/customer/requestFuel">
                <ListItemIcon>
                  <LocalGasStation />
                </ListItemIcon>
                <ListItemText primary="Request Fuel" />
              </ListItemButton>
            </ListItem>
            <Divider component="li" />
            {/* button to view the QR code */}
            <ListItem disablePadding>
              <ListItemButton component="a" href="/customer/qrcode">
                <ListItemIcon>
                  <QrCode />
                </ListItemIcon>
                <ListItemText primary="QR Code" />
              </ListItemButton>
            </ListItem>
            <Divider component="li" />
            {/* button to view the selected fuel stations */}
            <ListItem disablePadding>
              <ListItemButton component="a" href="/customer/fuelStations">
                <ListItemIcon>
                  <EditLocationIcon />
                </ListItemIcon>
                <ListItemText primary="Fuel Stations" />
              </ListItemButton>
            </ListItem>
            <Divider component="li" />
            {/* button to view the account details of the customer */}
            <ListItem disablePadding>
              <ListItemButton component="a" href="/customer/viewAccount">
                <ListItemIcon>
                  <AccountBox />
                </ListItemIcon>
                <ListItemText primary="Account" />
              </ListItemButton>
            </ListItem>
          </List>
        </FullSideBar>

        <IconSidebar>
          <List sx={{paddingY: 0}}>
            {/* home button */}
            <ListItem disablePadding>
              <ListItemButton component="a" href="/customer/home" sx={{padding: 1}}>
                <ListItemIcon sx={{minWidth: "24px"}}>
                  <Home/>
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            <Divider component="li" />
            {/* my vehicles button - to view the all registered vehicles */}
            <ListItem disablePadding>
              <ListItemButton component="a" href="/customer/myVehicles" sx={{padding: 1}}>
                <ListItemIcon sx={{minWidth: "24px"}}>
                  <DirectionsCar />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            <Divider component="li" />
            {/* button to request fuel form a vehicle */}
            <ListItem disablePadding>
              <ListItemButton component="a" href="/customer/requestFuel" sx={{padding: 1}}>
                <ListItemIcon sx={{minWidth: "24px"}}>
                  <LocalGasStation />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            <Divider component="li" />
            {/* button to view the QR code */}
            <ListItem disablePadding>
              <ListItemButton component="a" href="/customer/qrcode" sx={{padding: 1}}>
                <ListItemIcon sx={{minWidth: "24px"}}>
                  <QrCode />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            <Divider component="li" />
             {/* button to view the selected fuel stations to get fuel*/}
             <ListItem disablePadding>
              <ListItemButton component="a" href="/customer/fuelStations" sx={{padding: 1}}>
                <ListItemIcon sx={{minWidth: "24px"}}>
                  <EditLocationIcon />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            <Divider component="li" />
            {/* button to view the account details of the customer */}
            <ListItem disablePadding>
              <ListItemButton component="a" href="/customer/viewAccount" sx={{padding: 1}}>
                <ListItemIcon sx={{minWidth: "24px"}}>
                  <AccountBox />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          </List>
        </IconSidebar>
      </Box>
    </Box>
  );
};

export default Sidebar;

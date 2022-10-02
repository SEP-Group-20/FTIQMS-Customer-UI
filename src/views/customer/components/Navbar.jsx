import { AppBar, Avatar, Box, Menu, MenuItem, styled, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getUserName } from '../../../services/UserService';
import { useAuth } from '../../../utils/auth';

const StyledToolBar = styled(Toolbar)({
  bgcolor:"#d63447",
  display: "flex",
  justifyContent: "space-between",
});

const Icons = styled(Box)(( {theme} ) => ({
  display: "none",
  gap: "20px",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    display: "flex"
  }
}));

const UserBox = styled(Box)(( {theme} ) => ({
  display: "flex",
  gap: "10px",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    display: "none"
  }
}));

const Navbar = () => {
  const [open, setOpen] = useState(false);
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
    <AppBar position="sticky" sx={{background:"#d63447"}}>
      <StyledToolBar>
        <Typography variant='h5'>Fuel Token Issuer and Queue Management System</Typography>

        <Icons>
          <Typography variant='span'>
            {username}
          </Typography>
          <Avatar 
            sx={{width:30, height: 30}}
            onClick={e=>setOpen(true)}
          />
        </Icons>

        <UserBox onClick={e=>setOpen(true)}>
          <Avatar sx={{width:30, height: 30}} />
          <Typography variant='span'>
            {username}
          </Typography>
        </UserBox>

      </StyledToolBar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
       
        open={open}
        onClose={e=>setOpen(false)}

        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem component="a" href="#">Profile</MenuItem>
        <MenuItem component="a" href="#">Logout</MenuItem>
      </Menu>
    </AppBar>
  )
}

export default Navbar
import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Body from './components/Body';
import { Box, Stack } from "@mui/system";
import AccountDetails from './components/AccountDetails'

const AccountDetailsView= () => {
    return (
      <Box display="flex" flexDirection="column" sx={{ minHeight: "100vh" }}>
        <Navbar />
        <Stack
          direction="row"
          justifyContent="space-between"
          flex={1}
          overflow="auto"
        >
          <Sidebar />
          <AccountDetails/>
        
        </Stack>
      </Box>
    );
  };

  
export default AccountDetailsView;
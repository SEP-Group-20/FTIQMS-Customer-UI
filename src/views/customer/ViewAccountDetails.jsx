import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Box, Stack } from "@mui/system";
import AccountDetails from './components/AccountDetails'
import Topbar from "./components/Topbar";

const AccountDetailsView= () => { //account details
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
        <Stack direction="column" justifyContent="space-between" flex={1} overflow="auto">
          <Topbar heading="Account Details" goto="/customer/home"/>
          <AccountDetails/>
        </Stack>
      </Stack>
    </Box>
  );
};
  
export default AccountDetailsView;
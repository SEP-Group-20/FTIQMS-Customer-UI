import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Box, Stack } from "@mui/system";
import SelectedStations from "./components/SelectedStations";

const FuelStations = () => {
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
        <SelectedStations />
      </Stack>
    </Box>
  );
};

export default FuelStations;

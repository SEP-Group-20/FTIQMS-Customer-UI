import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Box, Stack } from "@mui/system";
import SearchStations from "./components/searchStations";
import FuelStationStack from "./components/fuelStationsStack";

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
        <FuelStationStack />
      </Stack>
    </Box>
  );
};

export default FuelStations;

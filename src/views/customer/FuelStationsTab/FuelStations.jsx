import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Box, Stack } from "@mui/system";
import SearchStations from "./components/searchStations";
import FuelStationCard from "./components/fuelStationCard";
import { Divider, Typography } from "@mui/material";
import SelectedStationsMap from "./components/SelectedStationsMap";
import { useState } from "react";
import { useEffect } from "react";
import {
  getUserFuelStations,
  setUserFuelStations,
} from "../../../services/UserService";
import Swal from "sweetalert2";

const FuelStations = () => {
  const [selectedStations, setSelectedStations] = useState(null);
  const [cardRefresher, setCardRefresher] = useState(false);

  useEffect(() => {
    const fetchSelectedStations = async () => {
      const result = await getUserFuelStations();
      // console.log(result.data);
      setSelectedStations(result.data.fuelStations);
    };
    fetchSelectedStations();
  }, [cardRefresher]);

  //this function will run when fuel station is selected from the combo box
  const fuelStationSelectionHandler = async (fuelStationId) => {
    if (selectedStations.includes(fuelStationId)) {
      Swal.fire({
        title: "You have already selected it",
        text: "Please try to add new one.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }
    if (selectedStations.length >= 2) {
      Swal.fire({
        title: "You have already selected 2 fuel stations!",
        text: "Drop one or more fuel stations to add a new one.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }
    try {
      const newFuelStations = selectedStations;
      newFuelStations.push(fuelStationId);
      const res = await setUserFuelStations({ fuelStations: newFuelStations });
      setCardRefresher(!cardRefresher);
    } catch (err) {
      Swal.fire({
        title: "Something went wrong when adding fuel station!",
        text: err.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const fuelStationDropHandler = async (fuelStationId) => {
    try {
      const newStations = [];
      selectedStations.forEach((station) => {
        if (station !== fuelStationId) newStations.push(station);
      });
      const res = await setUserFuelStations({ fuelStations: newStations });
      setCardRefresher(!cardRefresher);
    } catch (err) {
      Swal.fire({
        title: "Something went wrong when dropping fuel station!",
        text: err.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

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
        <Stack sx={{ border: "2px solid black", padding: "4px" }} spacing={2}>
          <Typography variant="body1" align="center">
            Selected Fuel Stations
          </Typography>
          <Divider />
          {selectedStations === null ? (
            <Typography>Loading...</Typography>
          ) : selectedStations.length === 0 ? (
            <Typography>No fuelStations to display..</Typography>
          ) : (
            selectedStations.map((stationId) => (
              <FuelStationCard
                key={stationId}
                fuelStationId={stationId}
                dropHandler={fuelStationDropHandler}
              />
            ))
          )}

          <Divider />
          <Typography variant="body1" align="center">
            Search fuel Stations
          </Typography>
          <SearchStations handleSelection={fuelStationSelectionHandler} />
        </Stack>
        <SelectedStationsMap />
      </Stack>
    </Box>
  );
};

export default FuelStations;

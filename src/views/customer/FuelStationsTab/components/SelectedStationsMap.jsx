import { Box } from "@mui/material";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

function SelectedStationsMap() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDiHGf2cG7mFOUa4-2AXbY4-teME8pfK8Y",
  });
  return (
    <Box bgcolor="#d1cebd" flex={5} p={1}>
      {!isLoaded && <h1>Loading...</h1>}
      {isLoaded && <Map />}
    </Box>
  );
}

function Map() {
  return (
    <GoogleMap
      zoom={8}
      center={{ lat: 8.0, lng: 80.1 }}
      mapContainerStyle={{ width: "100%", height: "88vh" }}
    ></GoogleMap>
  );
}

export default SelectedStationsMap;

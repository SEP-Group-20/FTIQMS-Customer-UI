import { Box, Stack } from "@mui/material";
import {
  GoogleMap,
  InfoWindowF,
  useLoadScript,
  MarkerF,
  CircleF,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { getAllFuelStations } from "../../../../services/fuelStationServices";
import FuelStationCard from "./fuelStationCard";
import PersonPinIcon from "@mui/icons-material/PersonPin";

function SelectedStationsMap({ selectionhandler }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
  });

  return (
    <Box bgcolor="#d1cebd" flex={5} p={1}>
      {!isLoaded && <h1>Loading...</h1>}
      {isLoaded && <Map selectionhandler={selectionhandler} />}
    </Box>
  );
}

function Map({ selectionhandler }) {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [center, setCenter] = useState({ lat: 8.0, lng: 80.1 });
  const [allStations, setAllStations] = useState(null);
  const [currentCardId, setCurrentCardId] = useState(null);
  const [currentCardLocation, setCurrentCardLocation] = useState(null);

  useEffect(() => {
    const fetchFuelStations = async () => {
      const result = await getAllFuelStations();
      setAllStations(result.data);
    };

    fetchFuelStations();
  }, []);

  const showCurrentLocation = (map) => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentLocation(pos);
          setCenter(pos);
        },
        () => {
          // handleLocationError(true, infoWindow, map.getCenter());
          console.log("error");
        }
      );
    } else {
      // Browser doesn't support Geolocation
      // handleLocationError(false, infoWindow, map.getCenter());
      console.log("not supported!");
    }
  };

  const options = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 20000,
    zIndex: 1,
  };
  return (
    <GoogleMap
      zoom={10}
      center={center}
      mapContainerStyle={{ width: "100%", height: "88vh" }}
      onLoad={(map) => showCurrentLocation(map)}
    >
      {currentLocation && (
        <InfoWindowF position={currentLocation}>
          <Stack>
            <PersonPinIcon />
            <h6>You're Here</h6>
          </Stack>
        </InfoWindowF>
      )}
      {currentLocation && (
        <CircleF
          // required
          center={currentLocation}
          // required
          options={options}
        />
      )}
      {allStations &&
        allStations.map((station) => (
          <MyMarker
            key={station._id}
            zIndex={station._id}
            id={station._id}
            handleClick={(id, position) => {
              setCurrentCardLocation(position);
              setCurrentCardId(id);
            }}
            position={{
              lat: station.location.Latitude,
              lng: station.location.Longitude,
            }}
          />
        ))}
      {currentCardId && (
        <InfoWindowF position={currentCardLocation}>
          <FuelStationCard
            fuelStationId={currentCardId}
            key={currentCardId}
            selectHandler={selectionhandler}
          />
        </InfoWindowF>
      )}
    </GoogleMap>
  );
}

function MyMarker({ id, position, handleClick }) {
  return (
    <MarkerF
      position={position}
      onClick={() => {
        handleClick(id, position);
      }}
    ></MarkerF>
  );
}

export default SelectedStationsMap;

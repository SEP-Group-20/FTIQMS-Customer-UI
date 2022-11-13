import { Stack } from "@mui/system";
import FuelStationCard from "./fuelStationCard";

function FuelStationStack() {
  return (
    <Stack spacing={2} mt="10px" sx={{ border: "3px solid" }}>
      <FuelStationCard fuelStationId="636aae3c43c5aab3fdc9cdc4" />
      <FuelStationCard fuelStationId="636aaf8143c5aab3fdc9ce19" />
    </Stack>
  );
}

export default FuelStationStack;

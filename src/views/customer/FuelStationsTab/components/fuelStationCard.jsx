import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { getFuelStationById } from "../../../../services/fuelStationServices";
import { Grid } from "@mui/material";

export default function FuelStationCard({ fuelStationId }) {
  const [station, setStation] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getFuelStationById(fuelStationId);
      setStation(result.data);
    };
    fetchData();
  }, []);

  return (
    <>
      {station ? (
        <Card sx={{ minWidth: 275, backgroundColor: "#DCDCDC" }}>
          <CardContent>
            <Stack direction="row" spacing={2}>
              <LocalGasStationIcon />
              <Typography variant="subtitle1" gutterBottom={true}>
                {station?.name}
              </Typography>
            </Stack>
            <Grid container>
              <Grid item xs={8}>
                <Box color="grey.600" minWidth="200px">
                  <Typography variant="body2">
                    {`No: ${station.address.No}, ${station.address.StreetName},`}
                  </Typography>
                  <Typography variant="body2">
                    {`${station.address.City}, ${station.address.District}.`}
                  </Typography>
                  <Typography variant="body2">{``}</Typography>
                  <Typography variant="body2">{`${station.mobile}`}</Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Button
                  sx={{ marginLeft: "20px" }}
                  size="small"
                  variant="outlined"
                  color="error"
                >
                  Drop
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

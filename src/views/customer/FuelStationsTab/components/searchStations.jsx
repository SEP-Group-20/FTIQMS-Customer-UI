import { Container } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { getAllFuelStations } from "../../../../services/fuelStationServices";
import { useState } from "react";
import { useRef } from "react";

function SearchStations({ handleSelection }) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const [selectedOption, setSelectedOption] = useState(null);
  const searchField = useRef();

  const showAlert = (e, val, reason) => {
    setSelectedOption(val);
    if (reason === "selectOption") {
      console.log(val);
      //do whatever you want
      handleSelection(val._id);

      setSelectedOption(null);
      searchField.current.blur();
    }
  };

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      if (options.length !== 0) return;
      const result = await getAllFuelStations(); // For demo purposes.

      if (active) {
        setOptions([...result.data]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  //   React.useEffect(() => {
  //     if (!open) {
  //       setOptions([]);
  //     }
  //   }, [open]);

  return (
    <Container maxWidth="sm">
      <Autocomplete
        id="asynchronous-demo"
        sx={{ width: 300 }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        ref={searchField}
        isOptionEqualToValue={(option, value) => option.name === value.name}
        getOptionLabel={(option) => option.name}
        onChange={(e, value, reason) => showAlert(e, value, reason)}
        options={options}
        loading={loading}
        value={selectedOption}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Fuel Stations"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    </Container>
  );
}

export default SearchStations;

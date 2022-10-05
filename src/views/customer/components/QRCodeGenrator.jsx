import QRCode from "qrcode";
import * as React from "react";
import { saveAs } from "file-saver";
import { Container, Box, Typography, Button, Stack } from "@mui/material";
import { useAuth } from "../../../utils/auth";

function QRCodeGen() {
  const { auth } = useAuth();
  const [src, setSrc] = React.useState("");

  React.useEffect(() => {
    QRCode.toDataURL(auth().user.NIC)
      .then((data) => {
        setSrc(data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const downloadImage = () => {
    saveAs(src, "image.jpg"); // Put your image url here.
  };

  return (
    <Box bgcolor="#d1cebd" flex={5} p={2}>
      <Typography
        variant="h2"
        sx={{ display: "flex", justifyContent: "center" }}
      >
        QR Code
      </Typography>
      <Container
        component="main"
        maxWidth="xs"
        sx={{ justifyContent: "center", width: "100%" }}
      >
        <Stack spacing={2}>
          <Box component="img" mt={5} src={src} sx={{ width: "100%" }}></Box>
          <Button variant="contained" sx={{background: "#ff5722", '&:hover': {backgroundColor: '#ff3c00'}}} onClick={downloadImage}>
            Download QR
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}

export default QRCodeGen;

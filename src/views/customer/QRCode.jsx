import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Box, Stack } from "@mui/system";
import QRCodeGen from "./components/QRCodeGenrator";
import Topbar from "./components/Topbar";

const QRCodeView = () => {
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
          <Topbar heading="QR Code" goto="/customer/home"/>
          <QRCodeGen />
        </Stack>
      </Stack>
    </Box>
  );
};

export default QRCodeView;

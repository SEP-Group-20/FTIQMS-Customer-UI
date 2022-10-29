import { ArrowBack, ArrowBackOutlined } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
  
const StyledToolBar = styled(Toolbar)({
  bgcolor: "#d63447",
  display: "flex",
  justifyContent: "space-between",
});

const Icons = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "20px",
  alignItems: "center",
}));

const Topbar = ({heading, goto}) => {
  return (
    <Box sx={{ background: "#ff5722" }}>
      <StyledToolBar>
        <Icons>
          <IconButton color="primary" aria-label="back" component="a" href={goto}>
            <ArrowBackOutlined sx={{height: 30, width: 30,borderRadius: '50%',border: 3, color:"white"}}/>
          </IconButton>
          <Typography variant="h5" color="white">
            {heading}
          </Typography>
        </Icons>

      </StyledToolBar>
    </Box>
  );
};

export default Topbar;
  
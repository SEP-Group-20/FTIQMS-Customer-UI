import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material";

const StyledToolBar = styled(Toolbar)({
  bgcolor: "#d63447",
  display: "flex",
  justifyContent: "space-between",
});

export default function PreLoginAppBar() {
  const navigate = useNavigate();

  return (
      <AppBar position="sticky" sx={{ background: "#d63447" }}>
        <StyledToolBar>
          <Typography variant="h5">
            Fuel Token Issuer and Queue Management System
          </Typography>
          <Box>
            <Button color="inherit" onClick={() => navigate("/Home")}>
              Home
            </Button>
            <Button color="inherit" onClick={() => navigate("/contact")}>
              Contact
            </Button>
            <Button color="inherit" onClick={() => navigate("/register")}>
              Register
            </Button>
            <Button color="inherit" onClick={() => navigate("/login")}>
              Login
            </Button>
          </Box>
        </StyledToolBar>
      </AppBar>
  );
}

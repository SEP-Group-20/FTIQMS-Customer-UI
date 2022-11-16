import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import PasswordLogin from "./components/PasswordLogin";
import OTPLogin from "./components/OTPLogin";
import PreLoginAppBar from "../../components/PreLoginAppBar";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function Login() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box display="flex" flexDirection="column" sx={{height: '100vh'}}>
      <PreLoginAppBar />
      <div
        style={{
          backgroundImage: `url("https://images.pexels.com/photos/9216590/pexels-photo-9216590.jpeg?cs=srgb&dl=pexels-erik-mclean-9216590.jpg&fm=jpg&_gl=1*b55um7*_ga*NjE4NDcwNTA3LjE2Njg1MzM4MTY.*_ga_8JE65Q40S6*MTY2ODUzMzgxNy4xLjEuMTY2ODUzMzk5MS4wLjAuMA..")`,
          backgroundSize: "100%",
          height: "100vh"
        }}
      >
        <Container component="main" maxWidth="xs">
          <Box sx={{ width: "100%", borderRadius: "15px", backgroundColor: `rgba(255, 255, 255, 0.8)`}} mt={4}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab label="Password Method" {...a11yProps(0)} />
                <Tab label="OTP Method" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <PasswordLogin />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <OTPLogin />
            </TabPanel>
          </Box>
        </Container>
      </div>
    </Box >
  );
}

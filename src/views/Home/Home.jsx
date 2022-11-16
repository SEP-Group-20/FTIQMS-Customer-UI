import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import PreLoginAppBar from "../../components/PreLoginAppBar";

function Home() {
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
        <Box sx={{
          width: '70%',
          height: '100%',
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
          }}
        >
          <Typography variant='h2' sx={{ color: "white", display: "flex", justifyContent: "center"}}>
            Welcome To the Fuel Token Issuer and Queue Management System  
          </Typography>
        </Box>
      </div>
    </Box>
  );
}

export default Home;

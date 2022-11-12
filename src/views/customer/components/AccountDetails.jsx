import * as React from 'react';
import { useState,useEffect } from 'react';
import Container  from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Grid from '@mui/material/Grid';
import { getUserDetails } from '../../../services/UserService';
import { useAuth } from "../../../utils/auth";

function selectType(type){
    if (type == "Delivered"){
        return <Grid item xs={12} md={4} sx={{fontSize: '1.2rem', fontWeight: 'bold', color: 'green'}}>
        : DELIVERED
    </Grid>
      
    }else if(type == "Pending"){
        return <Grid item xs={12} md={4} sx={{fontSize: '1.2rem', fontWeight: 'bold', color: 'blue'}}>
        : PENDING
    </Grid>
      
    }
    else if(type == "Cancelled"){
        return <Grid item xs={12} md={4} sx={{fontSize: '1.2rem', fontWeight: 'bold', color: 'red'}}>
        : CANCELLED
    </Grid>
    }
  }



export default function AccountDetails() {

    const { user } = useAuth().auth();
    const [AccountDetails, setAccountDetails] = useState();

    const handleSubmit = (event) => {
        event.preventDefault();
        // const data = new FormData(event.currentTarget);
        // console.log({
    
        //   email: data.get('email'),
        //   password: data.get('password'),
    
        // });
      };


    // const AccountDetails = 
    //     {
    //         fname : 'Nisanya',
    //         lname : 'Pathirana',
    //         userid : '0001',
    //         address : 'Alewella Road, Matara',
    //         mobile : '0765867087',
    //         district: 'Matara',
    //         email : 'ndpathirana@gmail.com',
    //         r_vehicles : ['Honda Mitsubishi','Toyota Premio']
    
    //     }

    useEffect(()=>{
        const fetchData = async ()=>{
            const result = await getUserDetails();
        setAccountDetails(result.data);
        console.log(result);
        }
        fetchData();

    },[AccountDetails])
    
        const [open, setOpen] = React.useState(false);

        const handleClick = () => {
          setOpen(!open);
        };


    return (
        <Box bgcolor="#d1cebd" flex={5} p={2} >
          <Box bgcolor="white" flex={5} p={3} sx={{ borderRadius: '9px' }}>
            
                {AccountDetails && <Grid container spacing={2} sx={{mt: '1.5vw'}}>
                    <Grid item xs={12} md={4} sx={{fontSize: '1.2rem', fontWeight: 'bold'}}>
                        Full Name
                    </Grid>
                    <Grid item xs={12} md={8} sx={{fontSize: '1.2rem'}}>
                        : {AccountDetails['firstName']} {AccountDetails['lastName']} 
                    </Grid>

                    <Grid item xs={12} md={4} sx={{fontSize: '1.2rem', fontWeight: 'bold'}}>
                        NIC
                    </Grid>
                    <Grid item xs={12} md={8} sx={{fontSize: '1.2rem'}}>
                        : {AccountDetails['NIC']}
                    </Grid>

                    <Grid item xs={12} md={4} sx={{fontSize: '1.2rem', fontWeight: 'bold'}}>
                        Contact Number
                    </Grid>
                    <Grid item xs={12} md={8} sx={{fontSize: '1.2rem'}}>
                        : {AccountDetails['mobile']}
                    </Grid>

                    <Grid item xs={12} md={4} sx={{fontSize: '1.2rem', fontWeight: 'bold'}}>
                        Registered Vehicles
                    </Grid>
                    <Grid item xs={12} md={8} sx={{fontSize: '1.2rem'}}>
                        : {AccountDetails['vehicles'].map(vehicle => <div key={vehicle} 
                       >{vehicle}</div>)}
                        
                    </Grid>

                    {/* <Grid item xs={12} md={4} sx={{fontSize: '1.2rem', fontWeight: 'bold'}}>
                        District
                    </Grid>
                    <Grid item xs={12} md={8} sx={{fontSize: '1.2rem'}}>
                        : {AccountDetails['district']}
                    </Grid> */}

                    {/* <Grid item xs={12} md={4} sx={{fontSize: '1.2rem', fontWeight: 'bold'}}>
                        Email address
                    </Grid>
                    <Grid item xs={12} md={8} sx={{fontSize: '1.2rem'}}>
                        : {AccountDetails['email']}
                    </Grid>

                    <Grid item xs={12} md={4} sx={{fontSize: '1.2rem', fontWeight: 'bold'}}>
                        Registered Vehicles 
                    </Grid>
                    <Grid item xs={12} md={4} sx={{fontSize: '1.2rem', color:'blue'}}>
                        {AccountDetails['r_vehicles'][0]}
                    </Grid>
                    <Grid item xs={12} md={4} sx={{fontSize: '1.2rem', color:'blue'}}>
                        {AccountDetails['r_vehicles'][1]}
                    </Grid> */}

                    </Grid>}
                    
            </Box>

        </Box>
    );
}





import * as React from 'react';
import { useState,useEffect } from 'react';
import Container  from '@mui/material/Container';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Grid from '@mui/material/Grid';
import { color } from '@mui/system';

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



export default function Home() {

    const handleSubmit = (event) => {
        event.preventDefault();
        // const data = new FormData(event.currentTarget);
        // console.log({
    
        //   email: data.get('email'),
        //   password: data.get('password'),
    
        // });
      };


    const AccountDetails = 
        {
            fname : 'Nisanya',
            lname : 'Pathirana',
            userid : '0001',
            address : 'Alewella Road, Matara',
            mobile : '0765867087',
            district: 'Matara',
            email : 'ndpathirana@gmail.com',
            r_vehicles : ['Honda Mitsubishi','Toyota Premio']
    
        }
    
        const [open, setOpen] = React.useState(false);

        const handleClick = () => {
          setOpen(!open);
        };


    return (
        <div>
            <Container  component="main" Width="" sx={{     mt: 20,
                                                            background:'#ffffff4d', 
                                                            borderLeft: "1px solid #ffffff4d",
                                                            borderTop: "1px solid #ffffff4d",
                                                            backdropFilter: 'blur(10px)',
                                                            // boxShadow: '20px 20px 40px -6px rgb(0 0 0 / 20%)',
                                                            boxShadow: 
                                                                        '0px 0px 0px 5px rgba( 255,255,255,0.4 ), 0px 4px 20px rgba( 0,0,0,0.33 )',
                                                            borderRadius:'10px', mb: '5vw', mt:0, width: '70%', padding: '2vw', paddingTop: 0}}>
                <CssBaseline />
                <Box sx={{
                        marginTop: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'Left',
                    }}>

                       

                        <Typography component="h2" variant="h5" color='primary' sx={{mt: 2, fontWeight: 'bold', fontSize: '1.5rem', textAlign: 'center'}}>
                            ACCOUNT DETAILS
                        </Typography>
                    
                        <Grid container spacing={2} sx={{mt: '1.5vw'}}>
                            <Grid item xs={12} md={4} sx={{fontSize: '1.2rem', fontWeight: 'bold'}}>
                                Full Name
                            </Grid>
                            <Grid item xs={12} md={8} sx={{fontSize: '1.2rem'}}>
                                : {AccountDetails['fname']} {AccountDetails['lname']} 
                            </Grid>

                            <Grid item xs={12} md={4} sx={{fontSize: '1.2rem', fontWeight: 'bold'}}>
                                User ID
                            </Grid>
                            <Grid item xs={12} md={8} sx={{fontSize: '1.2rem'}}>
                                : {AccountDetails['userid']}
                            </Grid>

                            <Grid item xs={12} md={4} sx={{fontSize: '1.2rem', fontWeight: 'bold'}}>
                                Address
                            </Grid>
                            <Grid item xs={12} md={8} sx={{fontSize: '1.2rem'}}>
                                : {AccountDetails['address']}
                            </Grid>

                            <Grid item xs={12} md={4} sx={{fontSize: '1.2rem', fontWeight: 'bold'}}>
                                Mobile
                            </Grid>
                            <Grid item xs={12} md={8} sx={{fontSize: '1.2rem'}}>
                                : {AccountDetails['mobile']}
                            </Grid>

                            <Grid item xs={12} md={4} sx={{fontSize: '1.2rem', fontWeight: 'bold'}}>
                                District
                            </Grid>
                            <Grid item xs={12} md={8} sx={{fontSize: '1.2rem'}}>
                                : {AccountDetails['district']}
                            </Grid>

                            <Grid item xs={12} md={4} sx={{fontSize: '1.2rem', fontWeight: 'bold'}}>
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
                            </Grid>

                            </Grid>
                            
                           
                            

                            
                                      
                        
                </Box>


            </Container>
        </div>
    );
}





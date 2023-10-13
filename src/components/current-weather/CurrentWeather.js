import React from 'react'
// import "./CurrentWeather.css"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const CurrentWeather = () => {
    return (
        <Card sx={{ maxWidth: "500px", color:"#fff",marginTop: '20px', backgroundColor: "#222222"}}>
            <CardContent>
                <Typography sx={{textAlign: "center"}} variant="h4" component="div">
                Bangalore
                </Typography>
            </CardContent>
        
            <CardMedia
                sx={{ height: "110px" , width:"80px", margin:"auto"}}
                image="/icons/01d.png"
                title="Sunny"
            />

            <CardContent>
                <Typography sx={{textAlign: "center"}} variant="h4" component="div">
                27°c
                </Typography>
            </CardContent>
          
        </Card>
      );
}

export default CurrentWeather
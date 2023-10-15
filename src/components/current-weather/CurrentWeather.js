import React, {useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/system/Unstable_Grid';
import BasicCard from '../commonComponents/Card';
import { getLocalTime } from '../utils'


const CurrentWeather = ({data}) => {
  return (
    <div>
      <Card sx={{ borderRadius: 1, display: 'flex',flexDirection: 'row', width: '100%', color: '#fff', marginTop: '5px', backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
        <CardContent sx={{ flex: 1, padding: "30px 10px 30px 10px"}}>
        <Typography variant="h6" component="div" sx={{ fontSize: '12'}} >
            {getLocalTime(data.dt, data.timezone)}
          </Typography>
          <Typography variant="h3" component="div" sx={{ fontSize: '15',fontWeight: 'bold' }} >
            {data.city}
          </Typography>
          <Typography variant="h3" component="div" sx={{padding: "15px 0px 0px 0px"}}>
            {Math.round(data.main.temp)}°C
          </Typography>
          <Typography variant="h5" component="div" sx={{fontSize: "20px", margin: "5px auto", fontWeight: "500"}}>
            {data.weather[0].main}
          </Typography>
          <div className='low-and-high' style={{margin: "5px auto"}}>
              <Typography variant="h5" component="span" sx={{padding: "10px 0px 0px 0px", fontSize: "20px", marginRight: "10px"}}>
                  H {Math.round(data.main.temp_max)}°C
              </Typography>
              <span sx={{ fontSize: '20'}}></span>
              <Typography variant="h5" component="span" sx={{padding: "10px 0px 0px 0px", fontSize: "20px", marginLeft: "10px"}}>
                  L {Math.round(data.main.temp_min)}°C
              </Typography>
          </div>
        </CardContent>

        <CardMedia
          sx={{ height: '100px', width: '100px', margin: "80px 60px 5px 0px" }}
          image={`/icons/${data.weather[0].icon}.png`}
          title="Sunny"
        />
      </Card>
    </div>
  );
}

export default CurrentWeather;

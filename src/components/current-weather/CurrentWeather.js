import React, {useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/system/Unstable_Grid';
import BasicCard from '../commonComponents/Card';


const CurrentWeather = ({data}) => {
  console.log('from current weather data', data);

  function formatTimestampToLocalTime(timestamp) {
    const date = new Date(timestamp * 1000); // Convert to milliseconds
  
    const hours = date.getHours();
    const minutes = date.getMinutes();
  
    return `${hours}:${minutes}`;
  }
  

  return (
    <div>
      <Card sx={{ borderRadius: 1, display: 'flex',flexDirection: 'row', width: '100%', color: '#fff', marginTop: '5px', backgroundColor: 'transparent'}}>
        <CardContent sx={{ flex: 1, padding: "30px 10px 30px 10px"}}>
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
          sx={{ height: '60px', width: '60px', margin: "80px 60px 5px 0px" }}
          image={`/icons/${data.weather[0].icon}.png`}
          title="Sunny"
        />
      </Card>

      <div style={{margin: "10px auto"}}>
      <Grid container spacing={2}>

        <Grid item xs={6}>
          <Card sx={{ borderRadius: 1, display: 'flex', width: '100%', color: '#fff', marginTop: '0px', backgroundColor: 'transparent' }}>
            <CardContent sx={{ margin: 0, display: 'flex', alignItems: 'center' }}>
              <span>
                <img src="icons/humidity.png" alt="Humidity Icon" style={{ width: '24px', marginRight: '10px', color: "white"}} />
              </span>
              <div>
                <Typography sx={{ fontSize: "18", color: "#fff"}}>
                  Humidity
                </Typography>
                <Typography variant="h3" sx={{ fontSize: "25", color: "#fff"}}>
                  {data.main.humidity}%
                </Typography>
              </div>
            </CardContent>
          </Card>

        </Grid>

        <Grid item xs={6}>
          <Card sx={{ borderRadius: 1, display: 'flex', width: '100%', color: '#fff', marginTop: '0px', backgroundColor: 'transparent' }}>
            <CardContent sx={{ margin: 0, display: 'flex', alignItems: 'center' }}>
              <span>
                <img src="icons/wind.png" alt="Humidity Icon" style={{ width: '24px', marginRight: '10px', color: "white"}} />
              </span>
              <div>
                <Typography sx={{ fontSize: "18", color: "#fff"}}>
                {`Wind (MPH)`}
                </Typography>
                <Typography variant="h3" sx={{ fontSize: "25", color: "#fff"}}>
                {data.wind.speed}
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6}>
          <Card sx={{ borderRadius: 1, display: 'flex', width: '100%', color: '#fff', marginTop: '0px', backgroundColor: 'transparent' }}>
            <CardContent sx={{ margin: 0, display: 'flex', alignItems: 'center' }}>
              <span>
                <img src="icons/sunrise.png" alt="Humidity Icon" style={{ width: '24px', marginRight: '10px', color: "white"}} />
              </span>
              <div>
                <Typography sx={{ fontSize: "18", color: "#fff"}}>
                {`Sunrise (am)`}
                </Typography>
                <Typography variant="h3" sx={{ fontSize: "25", color: "#fff"}}>
                {formatTimestampToLocalTime(data.sys.sunrise)}
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6}>
        <Card sx={{ borderRadius: 1, display: 'flex', width: '100%', color: '#fff', marginTop: '0px', backgroundColor: 'transparent' }}>
            <CardContent sx={{ margin: 0, display: 'flex', alignItems: 'center' }}>
              <span>
                <img src="icons/sunset.png" alt="Humidity Icon" style={{ width: '24px', marginRight: '10px', color: "white"}} />
              </span>
              <div>
                <Typography sx={{ fontSize: "18", color: "#fff"}}>
                {`Sunset (pm)`}
                </Typography>
                <Typography variant="h3" sx={{ fontSize: "25", color: "#fff"}}>
                {formatTimestampToLocalTime(data.sys.sunset)}
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      </div>

    </div>



  );
}

export default CurrentWeather;

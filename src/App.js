import React, { useState } from 'react';
import {Typography, ThemeProvider, createTheme } from '@mui/material';
import Search from './components/Search/Search';
import DayForcast from './components/moreDetails/DayForcast';
import CurrentWeather from './components/current-weather/CurrentWeather';
import DaysForcast from './components/moreDetails/DaysForcast';
import CityInfo from './components/current-weather/CityInfo';
import Box from '@mui/material/Box';
import Grid from '@mui/system/Unstable_Grid';
import styled from '@mui/system/styled';
import { getLocalTime } from './components/utils';

import {WEATHER_URL, WEATHER_API} from './components/api'

function App() {

  const [weather, setWeather] = useState(null);
  const [forcast, setForcast] = useState(null)
  const [weatherData, setWeatherData] = useState({
    humidity: '',
    'Wind (MPH)': '',
    'Sunrise (am)': '',
    'Sunset (pm)': '',
  });

  // Callback function to set the geo location from search component
  const handleLocationSelect = (location) => {
    // setGeoLocation(location);
    const lat = location.latitude
    const long = location.longitude
    const name = location.name

    const fetchWeather = fetch(`${WEATHER_URL}/weather?lat=${lat}&lon=${long}&appid=${WEATHER_API}&units=metric`)
    const fetchForcast = fetch(`${WEATHER_URL}/forecast?lat=${lat}&lon=${long}&appid=${WEATHER_API}&units=metric`)

    Promise.all([fetchWeather, fetchForcast])
    .then(async (response) => {
      const currentWeather = await response[0].json()
      const forcastResponse = await response[1].json()
      setWeather({city: name, ...currentWeather})
      setForcast({city: name, ...forcastResponse})
      
      const newData = {
        'Humidity': `${currentWeather.main.humidity}%`,
        'Wind (MPH)': currentWeather.wind.speed,
        'Sunrise (am)': getLocalTime(currentWeather.sys.sunrise, currentWeather.timezone),
        'Sunset (pm)': getLocalTime(currentWeather.sys.sunset, currentWeather.timezone),
      };
      setWeatherData(newData);

    }).catch((error) => {
      console.log(error);
    })
  }

  

  const theme = createTheme({
    typography: {
      fontFamily: ['Poppins', 'sans-serif'].join(','),
    },
  });

  const Item = styled('div')(({ theme }) => ({
    backgroundColor: "transparent",
    border: '0px solid',
    padding: theme.spacing(1),
    borderRadius: '4px',
    textAlign: 'center',
  }));

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: "30px", height: "0vh" }}>
  <Typography variant='h4' sx={{ margin: "20px auto" }}>
    Weather
  </Typography>
</Box>

      <Box
        sx={{boxShadow: 3, width: '80%', height: '100%', bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
          color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800', p: 1, m: 1, borderRadius: 1, textAlign: 'center', fontSize: '0.875rem',fontWeight: '700', margin: "40px auto", backgroundImage: weather && forcast ? 'linear-gradient(180deg, rgb(18, 72, 107,0), rgb(18, 72, 107,1))' : 'none'
        }}
      >
        <Search onLocationSelect={handleLocationSelect}/>
        {weather && forcast && ( <Grid container spacing={2} sx={{margin: "15px auto", backgroundColor: "transparent"}}>
          <Grid xs={6}>
            <Item>
              <CurrentWeather data={weather}/>
            </Item>
          </Grid>

          <Grid xs={6}>
            <Item>
              <DayForcast data={forcast}/>
            </Item>
          </Grid>
          <Grid xs={6}>
            <Item>
              <CityInfo data={weatherData}/>
            </Item>
          </Grid>
          <Grid xs={6}>
            <Item>
              <DaysForcast data={forcast}/>
            </Item>
          </Grid>
        </Grid>
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;

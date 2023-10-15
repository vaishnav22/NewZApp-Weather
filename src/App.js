import React, { useState, useEffect } from 'react';
import Box from '@mui/system/Box';
import { createTheme, ThemeProvider } from '@mui/material';
import Grid from '@mui/material/Grid';
import styled from '@mui/system/styled';
import Typography from '@mui/material/Typography';

//importing component
import Search from './components/Search/Search';
import DayForcast from './components/moreDetails/DayForcast';
import CurrentWeather from './components/current-weather/CurrentWeather';
import DaysForcast from './components/moreDetails/DaysForcast';
import CityInfo from './components/current-weather/CityInfo';
import SearchHistory from './components/searchHistory/SearchHistory';

//importing helper functions
import { getLocalTime } from './components/utils';
import { WEATHER_URL, WEATHER_API } from './components/api';

function App() {


  const [weather, setWeather] = useState(null);
  const [forcast, setForcast] = useState(null);
  const [searchHistory, setSearchHistory] = useState([])
  const [weatherData, setWeatherData] = useState({
    humidity: '',
    'Wind (MPH)': '',
    'Sunrise (am)': '',
    'Sunset (pm)': '',
  });

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    setSearchHistory(storedHistory);
  }, []);


  const handleLocationSelect = (location) => {
    const lat = location.latitude;
    const long = location.longitude;
    const name = location.name;

    const fetchWeather = fetch(`${WEATHER_URL}/weather?lat=${lat}&lon=${long}&appid=${WEATHER_API}&units=metric`);
    const fetchForcast = fetch(`${WEATHER_URL}/forecast?lat=${lat}&lon=${long}&appid=${WEATHER_API}&units=metric`);

    Promise.all([fetchWeather, fetchForcast])
      .then(async (response) => {
        const currentWeather = await response[0].json();
        const forcastResponse = await response[1].json();
        setWeather({ city: name, ...currentWeather });
        setForcast({ city: name, ...forcastResponse });

        // console.log('sdfsdfsdfsf', currentWeather);

        const newData = {
          'Humidity': `${currentWeather.main.humidity}%`,
          'Wind (MPH)': currentWeather.wind.speed,
          'Sunrise (am)': getLocalTime(currentWeather.sys.sunrise, currentWeather.timezone),
          'Sunset (pm)': getLocalTime(currentWeather.sys.sunset, currentWeather.timezone),
        };
        setWeatherData(newData);

        //for local storage dataa
        const newEntry = {
          dateTime: new Date(), // Capture current date and time
          tempMin: currentWeather.main.temp_min,
          tempMax: currentWeather.main.temp_max,
          currentTemp: currentWeather.main.temp,
          location: name
        };

        // Get the existing history from local storage
        const existingHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
        const updatedHistory = [...existingHistory, newEntry];
        //updating the localStorage object
        setSearchHistory(updatedHistory);
        localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
      })
      .catch((error) => {
        console.error(error);
      });
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
        sx={{
          boxShadow: 3,
          width: '80%', // Adjust this to your preferred maximum width
          padding: '10px', // Add some padding for a better mobile experience
          height: '100%',
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
          color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
          borderRadius: '4px',
          textAlign: 'center',
          fontSize: '0.875rem',
          fontWeight: '700',
          margin: "40px auto",
          backgroundImage: weather && forcast ? 'linear-gradient(180deg, rgb(18, 72, 107,0), rgb(18, 72, 107,1))' : 'none',
        }}
      >
        <Search onLocationSelect={handleLocationSelect} />

        {weather && forcast && ( <Grid container spacing={2} sx={{ margin: "15px auto", backgroundColor: "transparent" }}>
          <Grid item xs={12} sm={6}>
            <Item>
              <CurrentWeather data={weather} />
            </Item>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Item>
              <DayForcast data={forcast} />
            </Item>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Item>
              <CityInfo data={weatherData} />
            </Item>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Item>
              <DaysForcast data={forcast} />
            </Item>
          </Grid>
        </Grid>
        )}
      </Box>
      {searchHistory.length > 0 && (
        <SearchHistory />
      )}
    </ThemeProvider>
  );
}

export default App;

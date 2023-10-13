import {ThemeProvider } from '@mui/material';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles'
import logo from './logo.svg';
import './App.css';

import Search from './components/Search/Search';
import CurrentWeather from './components/current-weather/CurrentWeather';

function App() {

  const theme = createTheme({
    typography: {
      fontFamily: [
        'Poppins', 
        "sans-serif"
      ].join(','),
    }
  })
  return (
    <ThemeProvider theme={theme}>
      <div className="main_card">
        <Typography variant="h3" style={{ fontFamily: 'Poppins' }}>
          Weather
        </Typography>
        <Search />
        <CurrentWeather/>
      </div>
    </ThemeProvider>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';

import Search from './components/Search/Search';
import CurrentWeather from './components/current-weather/CurrentWeather';

function App() {
  return (
    <div className="main_card">
      <h1>Weather</h1>
      <Search />
      <CurrentWeather/>
    </div>
  );
}

export default App;

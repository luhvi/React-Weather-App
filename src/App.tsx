import { useState } from 'react';
import './App.css';
import Form from './Form';
import ToggleUnits from './ToggleUnits';
import CenterWeatherDisplay from './CenterWeatherDisplay';
import BottomWeatherDisplay from './BottomWeatherDisplay';

type WeatherData = {
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  sys: {
    country: string;
  };
  timezone: number;
  wind: {
    speed: number;
  };
};

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [units, setUnits] = useState<'metric' | 'imperial'>('metric');
  const [city, setCity] = useState<string>();

  return (
    <main>
      <div className="top-container">
        <Form setWeatherData={setWeatherData} units={units} setCity={setCity} />
        <ToggleUnits units={units} setUnits={setUnits} />
      </div>
      <div className="center-container">
        <CenterWeatherDisplay
          weatherData={weatherData}
          units={units}
          city={city}
        />
      </div>
      <div className="bottom-container">
        <BottomWeatherDisplay weatherData={weatherData} units={units} />
      </div>
    </main>
  );
}

export default App;

import '@fortawesome/fontawesome-free/css/all.min.css';

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

type WeatherDisplayGridProps = {
  weatherData: WeatherData | null;
  units: 'metric' | 'imperial';
};

const WeatherDisplayGrid = ({
  weatherData,
  units,
}: WeatherDisplayGridProps) => {
  return (
    <>
      <div>
        <i className="fa-solid fa-wind"></i>
        <h3 className="wind">
          Wind: {weatherData ? weatherData.wind.speed : null} m/s
        </h3>
      </div>
      <div>
        <i className="fa-solid fa-temperature-three-quarters"></i>
        <h3 className="feels-like">
          Feels like:{' '}
          {weatherData
            ? Math.round(
                units === 'metric'
                  ? weatherData.main.feels_like
                  : weatherData.main.feels_like * (9 / 5) + 32
              )
            : null}
          °
        </h3>
      </div>
      <div>
        <i className="fa-solid fa-droplet"></i>
        <h3 className="humidity">
          Humidity: {weatherData ? weatherData.main.humidity : null}%
        </h3>
      </div>
      <div>
        <i className="fa-solid fa-gauge-high"></i>
        <h3 className="pressure">
          Pressure: {weatherData ? weatherData.main.pressure : null} hPa
        </h3>
      </div>
    </>
  );
};

export default WeatherDisplayGrid;

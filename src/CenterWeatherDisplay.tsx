import { useState, useEffect, JSX } from 'react';

type WeatherData = {
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  sys: {
    country: string;
  };
  timezone: number;
};

type CenterWeatherDisplayProps = {
  weatherData: WeatherData | null;
  units: 'metric' | 'imperial';
  city: string | undefined;
};

const CenterWeatherDisplay = ({
  weatherData,
  units,
  city,
}: CenterWeatherDisplayProps): JSX.Element => {
  const [weatherIconSrc, setWeatherIconSrc] = useState<string>();
  const [weatherIconAlt, setWeatherIconAlt] = useState<string>();

  useEffect(() => {
    if (weatherData) {
      const weatherIconCode: string = weatherData.weather[0].icon;
      const weatherIconAltText: string = weatherData.weather[0].description;

      setWeatherIconAlt(weatherIconAltText);
      setWeatherIconSrc(
        `https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`
      );
    }
  });

  const capitalizeCity = (): string | null => {
    return city
      ? `${city.toLowerCase().charAt(0).toUpperCase()}${city
          .toLowerCase()
          .slice(1)}`
      : null;
  };

  const convertCountryCode = () => {
    let regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
    if (weatherData) {
      return regionNames.of(weatherData.sys.country);
    }
  };

  const getTimeInTimezone = (offsetSeconds: number): string => {
    const now = new Date();
    const utcTime = Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes()
    );

    const targetTime = new Date(utcTime + offsetSeconds * 1000);

    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: units === 'metric' ? false : true,
      timeZone: 'UTC',
    }).format(targetTime);
  };

  return (
    <>
      <div>
        <h2 className="city-country">
          {capitalizeCity()}, {convertCountryCode()}
        </h2>
        <h3 className="time">
          {weatherData ? getTimeInTimezone(weatherData.timezone) : null}
        </h3>
      </div>
      <img src={weatherIconSrc} alt={weatherIconAlt} />
      {weatherData ? (
        <h2 className="temp">
          {Math.round(
            units === 'metric'
              ? weatherData.main.temp
              : weatherData.main.temp * (9 / 5) + 32
          )}
          °
        </h2>
      ) : null}
      {weatherData ? (
        <div className="temp-min-max-container">
          <div className="temp-min">
            Min: {''}
            {Math.round(
              units === 'metric'
                ? weatherData.main.temp_min
                : weatherData.main.temp_min * (9 / 5) + 32
            )}
            °
          </div>
          <div>
            Max: {''}
            {Math.round(
              units === 'metric'
                ? weatherData.main.temp_max
                : weatherData.main.temp_max * (9 / 5) + 32
            )}
            °
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CenterWeatherDisplay;

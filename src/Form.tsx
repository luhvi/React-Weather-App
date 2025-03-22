import { Dispatch, SetStateAction, useEffect, JSX } from 'react';
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

type FormProps = {
  setWeatherData: Dispatch<SetStateAction<WeatherData | null>>;
  units: 'metric' | 'imperial';
  setCity: Dispatch<SetStateAction<string | undefined>>;
};

const Form = ({ setWeatherData, units, setCity }: FormProps): JSX.Element => {
  const apiKey: string = '1a63951585f4a3d3cc9b1201eafc0b69';

  useEffect(() => {
    setCity('Copenhagen');
    getWeatherData('Copenhagen');
  }, []);

  const handleSubmit = (formData: FormData): void => {
    const cityInput = formData.get('cityInput');
    if (typeof cityInput === 'string') {
      setCity(cityInput);
      getWeatherData(cityInput);
    }
  };

  type LocationData = {
    lat: number;
    lon: number;
  };

  const getWeatherData = (city: string): void => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          const { lat, lon }: LocationData = data[0];
          fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`
          )
            .then((response) => response.json())
            .then((data) => {
              if (data) {
                setWeatherData(data);
              } else {
                throw new Error('No city found.');
              }
            });
        }
      });
  };

  return (
    <>
      <form action={handleSubmit}>
        <button>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        <input type="text" placeholder="E.g. Tokyo..." name="cityInput" />
      </form>
    </>
  );
};

export default Form;

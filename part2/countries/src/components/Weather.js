import { useEffect, useState } from "react";
import axios from "axios";
const api_key = process.env.REACT_APP_API_KEY;

const Weather = ({ country }) => {
  const [weather, setWeather] = useState([]);
  const lat = country.latlng[0];
  const lon = country.latlng[1];
  console.log(lat, lon, api_key);
  useEffect(() => {
    const eventHandler = (response) => {
      setWeather(response.data);
      console.log(response.data);
    };
    const promise = axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`
    );
    promise.then(eventHandler);
  }, []);
  return (
    <>
      <h2> Weather in {country.capital[0]}</h2>
      <p> Temperature : {weather?.main?.temp} Celcius</p>
      <img
        src={`http://openweathermap.org/img/wn/${weather?.weather?.[0]?.icon}@2x.png`}
        alt={`Flag`}
      />
      <p> Wind: {weather?.wind?.speed} m/s</p>
    </>
  );
};

export default Weather;

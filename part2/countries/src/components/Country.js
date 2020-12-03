import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Country = ({ country }) => {

  const [weather, setWeather] = useState([])
  const api_key = process.env.REACT_APP_API_KEY

 

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
      .then(response => {
        setWeather(response.data)
      })
  }, [api_key, country.capital])

  console.log('pogodka', weather.current);


  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      <ul>
        {country.languages.map(language => 
          <li key={language.name}>{language.name}</li>
        )}
      </ul>
      <img src={country.flag} alt='Country flag' width='30%' border= '1px'></img>
      <h2>Weather in {country.capital}</h2>
      <p>temperature {weather.current ? weather.current.temperature : "Loading.."} Celsium</p>
      <p>wind speed {weather.current ? weather.current.wind_speed : "Loading.."} m/s</p>
      <p>cloud cover {weather.current ? weather.current.cloudcover : "Loading.."} %</p>
      <img src={weather.current ? weather.current.weather_icons[0] : "Loading.."} alt='' width='10%' border= '1px'></img>

    </div>
)



}




export default Country
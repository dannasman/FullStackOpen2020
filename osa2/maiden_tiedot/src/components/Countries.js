import React, { useState, useEffect } from 'react';
import axios from 'axios'

const Weather = ({ weather }) => {
    return (
        <div>
            <h3>temperature: {weather.temperature}</h3>
            <img src={weather.weather_icons[0]} alt="" style={{ width: 100 }} />
            <h3>wind: {weather.wind_speed + ' mph direction ' + weather.wind_dir}</h3>
        </div>
    )
}

const Information = ({ country }) => {
    const [weather, setWeather] = useState([])
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        console.log('effect')
        axios
            .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`)
            .then(response => {
                setWeather(response.data.current)
                console.log('weather promise fulfilled')
            }).then(() => {
                setLoaded(true)
            })
    }, [])
    return (
        <div>
            <h1>{country.name}</h1>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h2>languages</h2>
            <ul>
                {country.languages.map(l => <li key={l.name}>{l.name}</li>)}
            </ul>
            <img src={country.flag} alt="" style={{ width: 100 }} />
            <h2>Weather in {country.capital}</h2>
            {loaded ? <Weather weather={weather} /> : null}
        </div>
    )
}

const Button = ({ country }) => {
    const [show, setShow] = useState(false)


    const showInformation = () => {
        console.log('showing information')
        setShow(true)
    }

    return (
        show ? <Information country={country} /> : <div>{country.name} <button onClick={showInformation}>show</button></div>
    )
}

const Countries = ({ countries }) => {
    console.log('kutsuttu')
    return (
        <div>
            {countries.length === 1 ? <Information country={countries[0]} /> : countries.map(c => <Button key={c.name} country={c} />)}
        </div>
    )
}

export default Countries
import React from 'react';

const Country = (props) => {

    const country = props.country
    const weather = props.weather
    // console.log('country :>> ', country);
    // console.log('country.languages :>> ', country.languages);


    if(country !== null)
    {
        if (weather === null)
        {
            return (
                <section>
                    <h2>{country.name}</h2>
                    <p>Capital : {country.capital}</p>
                    <p>Population : {country.population}</p>
    
                    <h2>Languages</h2>
    
                    <ul>
                        {country.languages.map((language) => 
                            <li key={language}>{language}</li>
                        )}
                    </ul>
    
                    <img width='20%' src = {country.flag} alt={"Flag of "+country.name}></img>
                </section>
            );   
        }
        else{
            return (
                <section>
                    <h2>{country.name}</h2>
                    <p>Capital : {country.capital}</p>
                    <p>Population : {country.population}</p>
    
                    <h2>Languages</h2>
    
                    <ul>
                        {country.languages.map((language) => 
                            <li key={language}>{language}</li>
                        )}
                    </ul>
    
                    <img width='20%' src = {country.flag} alt={"Flag of "+country.name}></img>
                    <h2>Weather in {country.name}</h2>
                    <p>Temperature : {weather.current.temperature} °C</p>
                    <img src={weather.current.weather_icons[0]} alt={"Actual weather in "+ country.capital}></img>
                    <p>Wind : {weather.current.wind_speed} mph, direction : {weather.current.wind_dir}</p>
                </section>
            );   
        }
    }else{
        return(null)
    }
};

export default Country;
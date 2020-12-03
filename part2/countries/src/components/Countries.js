
import React from 'react'
import Country from './Country'

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
)


const Countries = ({ countries, onClick }) => {
  let selected = countries.length

  if (selected === 0) {
    return (
      <div>
        <p>No countries by that name!</p>
      </div>
    )
  } else if (selected === 1) {
    return (
      <Country country = {countries[0]} />
    )
  } else if (selected < 10 ) {
    return (
      <div>
        {countries.map(country => 
          <p key={country.name}>
            {country.name} <Button handleClick={() => onClick(country.name)} text='show' />
          </p>
        )}
      </div>
    )
  } else {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  }
}

export default Countries

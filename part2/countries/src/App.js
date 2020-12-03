import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import axios from 'axios'
import Countries from './components/Countries'




const App = () => {
  const [ countries, setCountries ] = useState([]) 
  const [searchValue, setSearchValue] = useState('')


  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  console.log('render', countries.length, 'countries')

  

  const handleSearchPresent = (event) => {
    console.log(event.target.value);
    setSearchValue(event.target.value)
  }

  const countriesToShow = countries.filter(person => 
    person.name.toLowerCase().includes(searchValue.toLowerCase()) === true)


  return (       
    <div>
      <h2>Find countries</h2>

      <Filter searchValue = {searchValue} handleSearchPresent = {handleSearchPresent} />

      <div>

      <Countries countries={countriesToShow} onClick={setSearchValue} />

      </div>
    </div>
  )
}

export default App
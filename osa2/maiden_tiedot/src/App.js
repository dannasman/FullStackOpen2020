import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Countries from './components/Countries'

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all').then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      find countries{' '}
      <input
        value={search}
        onChange={handleSearchChange}
      />
      <div>
        {(countries.filter(c => c.name.toLowerCase().includes(search.toLowerCase())).length <= 10) ?
          <Countries countries={countries.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))} /> :
          (<p>Too many matches, specify another filter</p>)}
      </div>
    </div>
  );
}

export default App;

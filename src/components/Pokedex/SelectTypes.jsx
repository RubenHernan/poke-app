import axios from 'axios';
import React, { useEffect, useState } from 'react'

const SelectTypes = ({setSelectValue,setInputValue,isShared}) => {
const [types, setTypes] = useState();

useEffect(() => {
  const url = 'https://pokeapi.co/api/v2/type';
  axios.get(url)
    .then(res => setTypes(res.data))
    .catch(err  => console.log(err))
}, [])

const handleChange = e => {
  setInputValue();
    setSelectValue(e.target.value);
}

  return (
    <div  className='container__select'>
    <select className={`pokedex__select ${isShared ? "pokedex__select--disabled" : ""}`} onChange={handleChange}>
        <option value="allPokemons">All pokemons</option>
      {
        types?.results.map( type => (
            <option value={type.url} key={type.url}>{type.name}</option>
        ))
      }
  </select>
  </div>
  )
}

export default SelectTypes
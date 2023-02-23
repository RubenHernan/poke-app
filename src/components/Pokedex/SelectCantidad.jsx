import React from 'react'
import "./styles/selectCant"

const SelectCantidad = () => {
  return (
    <select className='select__cant'>
        <option>Select a option...</option>
        <option value="4">4</option>
        <option value="8">8</option>
        <option value="12">12</option>
        <option value="16">16</option>
        <option value="20">20</option>
    </select>
  )
}

export default SelectCantidad
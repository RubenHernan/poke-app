import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "./styles/pokecard.css"

const PokeCard = ({pokemon}) => {



  const [poke, setPoke] = useState();
  const {colors,darkMode} = useSelector(reducer=> reducer);
  const [color, setColor] = useState();
  const navigate = useNavigate();

  useEffect(()=>{
    axios.get(pokemon.url)
        .then(res => {
            const obj = {}
            for (const color of colors) {
                if(color.name === res.data.types[0].type.name) {
                    obj.gradient = color.background;
                    obj.color =color.color;
                }
            }
            setColor(obj);
            setPoke(res.data)})
        .catch(err => console.log(err))
  },[])

  const handleClick = () => {
    navigate(`/pokedex/${poke.id}`)
  }

  return (
    <div onClick={handleClick} className="card" style={{border: `${color?.color} solid 10px`}}>
        <div className='card__header' style={{background:`${color?.gradient}` }}>
                <img className='card__img' src={poke?.sprites.other['official-artwork'].front_default} alt="" />
        </div>
        <h2 className='card__title' style={{color: `${ darkMode ? "white" : color?.color}`}}>{poke?.name}</h2>
        <ul className='card__type'>
            {
                poke?.types.map(type=>(
                    <li className='card__type--item' key={type.type.name}>{type.type.name}</li>
                ))
            }
        </ul>
        <hr />
        <ul className='card__stats'>
            {
                poke?.stats.map(stat => (
                    <li className='card__stats--item' key={stat.stat.url}>
                        <span className='card__stats--name'>{stat.stat.name}</span>
                        <span className='card__stats--number'>{stat.base_stat}</span>
                    </li>
                ))
            }
        </ul>
    </div>
  )
}

export default PokeCard
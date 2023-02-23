import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import NotFound from '../components/Pokedex/NotFound';
import Bar from '../components/shared/Bar';
import "./styles/pokeinfo.css"

const PokeInfo = () => {

 const { id } = useParams();

 const {nameTrainer} = useSelector(reducer => reducer);
  const navigate = useNavigate();
 const [hasError, setHasError] = useState(false)

 const {colors} = useSelector(reducer=> reducer);
  const [color, setColor] = useState();
 
 const [poke, setPoke] = useState()
 console.log(poke);
 useEffect(()=>{
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`
    axios.get(url)
        .then(res => {
          const obj = {}
            for (const color of colors) {
                if(color.name === res.data.types[0].type.name) {
                    obj.gradient = color.background;
                    obj.color =color.color;
                }
            }
            setColor(obj);
            setHasError(false);
            setPoke(res.data);
        })
        .catch(err => {
            setHasError(true)
            console.log(err)
        })
 },[id])

 const handleHome = e => {
  navigate('/pokedex');
}


 if(hasError) return <NotFound></NotFound>

  return (
    <div>
      <Bar nameTrainer={nameTrainer}></Bar>
      <div className='pokedex__img'>
          <img onClick={handleHome} src="./img/poke-dex.png" alt="" />
      </div>

      <div className='pokeinfo'>
        <div className='pokeinfo__container1'>
        <div className='pokeinfo__header' style={{background:`${color?.gradient}` }}>
           <div className='pokeinfo__img'>
            <img src={poke?.sprites.other['official-artwork'].front_default} alt="" />
          </div> 
        </div>

        <div className='pokeinfo__content'>
          <h1 className='pokeinfo__name'>{poke?.name}</h1>
          <div className='pokeinfo__sizes'>
            <div className='pokeinfo__sizes--item'>
              <span>Weight</span>
              <h2>{poke?.weight}</h2>
            </div>
            <div className='pokeinfo__sizes--item'>
              <span>Height</span>
              <h2>{poke?.height}</h2>
            </div>
          </div>

        <div className='pokeinfo__info'>
            <div className='pokeinfo__info--box'>
                <h2>Type</h2>
                <div className='pokeinfo__info--item'>
                  {
                    poke?.types.map(type => {
                      let aux = "";
                      for (const color of colors) {
              
                        if(color.name === type.type.name) {
                            aux = color.color;
                        }
                      }

                       return <span style={{backgroundColor: aux,color: "white"}}>{type.type.name}</span>
                    })
                  }
                </div>
            </div>
            <div className='pokeinfo__info--box'>
                <h2>Abilities</h2>
                <div className='pokeinfo__info--item'>
                  {
                    poke?.abilities.map(ability => (
                      <span key={ability.ability.name}>{ability.ability.name}</span>
                    ))
                  }
                </div>
            </div>
        </div>
      
        <div className='pokeinfo__stats'>
          <h1 className='pokeinfo__stats--title'>Stats</h1>
          <div className='pokeinfo__stats--box'>
             {
              poke?.stats.map(stat => (
                <div className='pokeinfo__stats--item' key={stat.stat.name}>
                  <div className='pokeinfo__stats--num'>
                    <h3>{stat.stat.name}</h3>
                    <span>{stat.base_stat}/200</span>
                    </div>
                    <div className='pokeinfo__stats--bar'><span className='pokeinfo__stats--bar2' style={{width: `${(stat.base_stat * 100)/200}%` }}></span></div>
                </div>
              ))
             }
          </div>
        </div>
</div>

        </div>
             
        <div className='pokeinfo__container2'>
        <h1 className='pokeinfo__stats--title'>Movements</h1>
          <div className='pokeinfo__movements--box'>
             {
              poke?.moves.map(move => (
                <span>{move.move.name}</span>
              ))
             }
          </div>
        </div>

      </div> 


    </div>
  )
}

export default PokeInfo
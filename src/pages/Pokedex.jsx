import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NotFound from '../components/Pokedex/NotFound';
import Pagination from '../components/Pokedex/Pagination';
import PokeCard from '../components/Pokedex/PokeCard';
import SelectTypes from '../components/Pokedex/SelectTypes';
import Bar from '../components/shared/Bar';
import "./styles/pokedex.css"

const Pokedex = () => {

const {nameTrainer} = useSelector(reducer => reducer);
const [pokemons, setPokemons] = useState();
const [selectValue, setSelectValue] = useState("allPokemons");
const [inputValue, setInputValue] = useState();
const [hasError, setHasError] = useState(false);
const [isShared, setIsShared] = useState(false);

  //estados que me sirven para la paginacion
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalItems, setTotalItems] = useState();

  //const para poder hacer el slice al arreglo de items
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

useEffect(()=>{

  if(inputValue){
    setIsShared(true);
    const url =`https://pokeapi.co/api/v2/pokemon/${inputValue}/`;
    axios.get(url)
        .then(res=> {
          setHasError(false);
          const results = [];
          const obj = {}
          obj["name"] = res.data.name;
          obj["url"] = url;
          results.push(obj)
          setPokemons({results})
          setCurrentPage(1);
          setTotalItems({results}.results.length);
        })
        .catch(err => {
          setTotalItems(0);
          setHasError(true);
          console.log(err)})
        .finally(res => setIsShared(false));
  }else{

  if(selectValue === 'allPokemons'){
  
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=0';
    axios.get(url)
        .then(res=> {
          setHasError(false);
          setCurrentPage(1);
          setPokemons(res.data);
          setTotalItems(res.data.results.length);
        })
        .catch(err => {
          setTotalItems(0);
          console.log(err)})
  }else{
    axios.get(selectValue)
    .then(res=> {
      setHasError(false);
      const results = res.data.pokemon.map(e=>e.pokemon)
      setCurrentPage(1);
    setPokemons({results})
    setTotalItems({results}.results.length);
   })
    .catch(err =>{
      setTotalItems(0);
      console.log(err)})
  }
}
},[selectValue, inputValue])


const navigate = useNavigate();

const handleSubmit = e =>{
  e.preventDefault();
  setInputValue(e.target.pokemon.value.trim().toLowerCase());
  // navigate(``)
}

const handleHome = e => {
  navigate('/pokedex');
}


  return (
    <div className='pokedex'>
       
      <Bar nameTrainer={nameTrainer}></Bar>
      <div className='pokedex__img'>
          <img onClick={handleHome} src="./img/poke-dex.png" alt="" />
      </div>
        <div className='pokedex__container'>
          <p className='pokedex__welcome'><span className='pokedex__user'>Welcome {nameTrainer},</span> you can find your favorite pokemon here!</p>
          <div className='pokedex__filter'>
      <form onSubmit={handleSubmit} className='pokedex__form'>
        <input className={isShared ? "pokedex__select--disabled" : ""}  id='pokemon' type="text" />
        <button className={isShared ? "pokedex__select--disabled" : ""}>Search</button>
      </form>
      <SelectTypes isShared={isShared} setSelectValue={setSelectValue} setInputValue={setInputValue} />
      </div>
      {/* <div className='pokedex__cant'>
      <SelectCantidad />
      </div> */}
      {
        hasError ? 
      <NotFound />

        :
        <>
      <div className='pokemons'>
        {
            pokemons?.results.map(pokemon => (
        
                <PokeCard key={pokemon.url} url={pokemon.url} pokemon={pokemon}/>
            )).slice(firstIndex,lastIndex)
        }
        </div>
        <Pagination itemsPerPage={itemsPerPage} 
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      totalItems={totalItems}/>
        </>
      }
        </div>
    </div>
  )
}

export default Pokedex
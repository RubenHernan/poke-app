import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Bar from '../components/shared/Bar';
import { setNameTrainer } from '../store/slices/trainerName.slice';

import "./styles/home.css"

const Home = () => {

   const dispatch = useDispatch();
   const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(setNameTrainer(e.target.name.value.trim()))
        e.target.name.value = '';
        navigate('/pokedex');
    }

  
  return (
    <div className='home'>
      <div className='home__container'>
        <div className='home__img'>
          <img src="./img/poke-dex.png" alt="" />
        </div>
        <div className='home__box'>
          <div className='home__title'>
            <h1>Hi, trainer!</h1>
            <p>Give me your name to start...</p>
          </div>
          <form className='home__form' onSubmit={handleSubmit}>
              <input id='name' type="text" />
              <button>Start</button>
          </form>

        </div>
        <div className='home__bar'>
          <Bar ></Bar>
        </div>
        </div>
    </div>
  )
}

export default Home
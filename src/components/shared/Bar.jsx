import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDarkMode } from '../../store/slices/darkMode.slice';
import "./styles/bar.css"

const Bar = ({nameTrainer}) => {
  
  const {darkMode} = useSelector(reducer => reducer);

  const dispatch = useDispatch();

  const handleDarkMode = () =>{
    dispatch(setDarkMode());
  }
  
  return (
    <div className='bar'>
        <div className={`bar__secondary ${ nameTrainer ? "bar__secondary-2" : ""}`}>
             <div onClick={handleDarkMode} className={`bar__circle ${ nameTrainer ? "bar__circle-2" : ""}`}>
                <div className='bar__circle--2'><i className={`bar__i bx bx-${darkMode ? "sun" : "moon"}`}></i></div>
             </div>
        </div>
  </div>
  )
}

export default Bar
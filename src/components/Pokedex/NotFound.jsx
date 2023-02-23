import React from 'react'
import "./styles/notfound.css"

const NotFound = () => {
  return (
    <div className='notfound'>
        <div className='notfound__img'>
            <img src="./img/not-found.jpg" alt="not found" />
        </div>
        <h2>Pokemon not found...</h2>
    </div>
  )
}

export default NotFound
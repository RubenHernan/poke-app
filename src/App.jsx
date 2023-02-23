

import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import Pokedex from './pages/Pokedex';
import PokeInfo from './pages/PokeInfo';
import ProtectedRoutes from './pages/ProtectedRoutes';

function App() {

  const {darkMode} = useSelector(reducer => reducer);
console.log(darkMode);
  return (
    <div className={`App ${darkMode? "darkmode" :""}`}>
      <Routes>
        <Route path='/' element={<Home></Home>} />

        <Route element={<ProtectedRoutes ></ProtectedRoutes>}>
            <Route path='/pokedex' element={<Pokedex></Pokedex>}></Route>
            <Route path='/pokedex/:id/' element={<PokeInfo></PokeInfo>}></Route>
        </Route>

      </Routes>
    </div>
  )
}

export default App

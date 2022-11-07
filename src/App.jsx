import "./styles.css";

import Context from "./Context/context.js";
import { useState, useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./views/Home";
import Favoritos from "./views/Favoritos";

export default function App() {
  const endpoint = "fotos.json";

  const [fotos, setFotos] = useState([])
  const [favoritos, SetFavoritos] = useState([])

  const handleFavoritos = (foto) => {
    const enFavoritos = favoritos.includes(foto)

    if (enFavoritos) {
      const favoritosActualizado = favoritos.filter((favorito) => favorito != foto)
      SetFavoritos(favoritosActualizado)

    } else {
      const favoritosActualizado = [...favoritos]
      favoritosActualizado.push(foto)
      SetFavoritos(favoritosActualizado)
    }


  }

  const globalState = { fotos, favoritos, handleFavoritos }

  useEffect(() => {
    fetch(endpoint)
      .then((res) => res.json())
      .then((json) => {
        console.log(json.photos)
        setFotos(json.photos)
      })
      .catch((e) => console.log(e))

  }, [])

  return (
    <div className="App">
      <Context.Provider value={globalState}>
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favoritos" element={<Favoritos />} />
          </Routes>
        </BrowserRouter>
      </Context.Provider>
    </div>
  );
}

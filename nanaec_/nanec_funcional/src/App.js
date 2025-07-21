import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ListaRestaurantes from "./Componentes/ListaRestaurantes";
import CrearRestaurante from "./Componentes/CrearRestaurante";
import ComponenteAxios from './Componentes/ComponeteAxios';
import Inicio from './Componentes/Inicio';
import React, { useState } from 'react';
import axios from 'axios';
function App() {
  const [restaurantes, setRestaurantes] = useState([]);
  // Cargar los restaurantes al iniciar la aplicación
  const baseURL = 'http://localhost:8000/';
  
  React.useEffect(() => {
    obtenerRestaurantesClientes();
  }, []);
  
  const obtenerRestaurantesClientes = () => {
    axios.get(baseURL + "restaurantes").then(response => {
      setRestaurantes(response.data);
    })
    .catch(error => {
      console.error("Error al obtener los restaurantes:", error);
    });

  };

  const [state, setState] = useState({
    nombre: "",
    direccion: "",
    tipo: "",
    reputacion: "",
    UrlImagen: "",
  });

  const agregarRestaurante = (nuevoRestaurante) => {
    const restauranteParaBackend = {
      ...nuevoRestaurante,
      url: nuevoRestaurante.UrlImagen,
    };
    delete restauranteParaBackend.UrlImagen;

    axios
      .post(baseURL + "restaurantes", restauranteParaBackend)
      .then(() => {
        obtenerRestaurantesClientes(); // Actualiza la lista desde el backend
      })
      .catch((error) => {
        console.error("Error al crear restaurante:", error);
        alert("No se pudo crear el restaurante.");
      });
  };

  const eliminarRestaurante = (index) => {
    const restauranteAEliminar = restaurantes[index];
    if (!restauranteAEliminar || !restauranteAEliminar._id) {
      alert("No se puede eliminar: restaurante sin _id.");
      return;
    }
    axios
      .delete(baseURL + "restaurantes/" + restauranteAEliminar._id)
      .then(() => {
        obtenerRestaurantesClientes(); // Actualiza la lista desde el backend
      })
      .catch((error) => {
        console.error("Error al eliminar el restaurante:", error);
        alert("No se pudo eliminar el restaurante.");
      });
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path='/crear' element={
            <CrearRestaurante
            state={state}
            setState={setState}
            agregarRestaurante={agregarRestaurante}
            />
            } 
            />
          <Route
            path="/lista"
            element={
              <ListaRestaurantes
                restaurantes={restaurantes}
                handleEliminar={eliminarRestaurante}
              />
            }
          ></Route>
          <Route path ="/axios" element={<ComponenteAxios />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;



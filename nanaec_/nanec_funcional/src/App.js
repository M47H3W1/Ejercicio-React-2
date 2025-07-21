import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ListaRestaurantes from "./Componentes/ListaRestaurantes";
import CrearRestaurante from "./Componentes/CrearRestaurante";
import ComponenteAxios from './Componentes/ComponeteAxios';
import Inicio from './Componentes/Inicio';
import ActualizarRestaurante from './Componentes/ActualizarRestaurante';
import React, { useState } from 'react';
import axios from 'axios';
function App() {
  const endpoint = "http://localhost:8000/restaurantes";
//Use params para obter los parametros de la URL
  const [restaurantes, setRestaurantes] = useState([]);
  // Cargar los restaurantes al iniciar la aplicación
  const baseURL = 'http://localhost:8000/';
  
  React.useEffect(() => {
    obtenerRestaurantesAxios();
  }, []);
  //Se cargan los restaurantes desde el servidor
  const obtenerRestaurantesAxios = () => {
    axios.get(endpoint)
      .then(response =>setRestaurantes(response.data))
      .catch(error => console.error('Error al obtener los restaurantes:', error));
  };

  //Se agrega un nuevo restaurante al servidor
  const agregarRestauranteAxios = (nuevoRestaurante) => {
    const restauranteParaBackend = {
      ...nuevoRestaurante,
      url: nuevoRestaurante.UrlImagen,
    };
    delete restauranteParaBackend.UrlImagen;

    axios.post(endpoint, restauranteParaBackend)
      .then(() => {
        obtenerRestaurantesAxios(); // Recarga la lista desde el backend
      })
      .catch(error => console.error('Error al agregar el restaurante:', error));
  };
  //Se elimina un restaurante del servidor
  const eliminarRestauranteAxios = (id) => {
    axios.delete(endpoint + '/' + id)
      .then(() => {
        obtenerRestaurantesAxios(); // Recarga la lista desde el backend
      })
      .catch(error => console.error('Error al eliminar el restaurante:', error));
  };
     
  //Se actualiza un restaurante en el servidor
  const actualizarRestaurante = (restauranteActualizado) => {
    axios.put(endpoint + '/' + restauranteActualizado.id, restauranteActualizado)
      .then(() => {
        obtenerRestaurantesAxios(); // Recarga la lista desde el backend
      })
      .catch(error => console.error('Error al actualizar el restaurante:', error));
  }
  
  const [state, setState] = useState({
    nombre: "",
    direccion: "",
    tipo: "", 
    reputacion: "",
    UrlImagen: "",
  });

  const agregarRestaurante = (nuevoRestaurante) => {
    agregarRestauranteAxios(nuevoRestaurante);
  };

  const eliminarRestaurante = (index) => {
    const restaurante = restaurantes[index];
    if (!restaurante || !restaurante._id) {
      alert("No se puede eliminar: restaurante sin _id.");
      return;
    }
    eliminarRestauranteAxios(restaurante._id);
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
            <Route path="/actualizar/:id" element={
  <ActualizarRestaurante
    state={state}
    setState={setState}
    actualizarRestaurante={actualizarRestaurante}
  />
} />
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



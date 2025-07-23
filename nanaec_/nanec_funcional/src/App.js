import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ListaRestaurantes from "./Componentes/ListaRestaurantes";
import CrearRestaurante from "./Componentes/CrearRestaurante";
import ComponenteAxios from './Componentes/ComponeteAxios';
import Inicio from './Componentes/Inicio';
import ActualizarRestaurante from './Componentes/ActualizarRestaurante';
import React, { useState } from 'react';
import axios from 'axios';
import { ENDPOINTS } from './config/endpoints';

function App() {
  const [restaurantes, setRestaurantes] = useState([]);
  
  React.useEffect(() => {
    obtenerRestaurantesAxios();
  }, []);

  //Se cargan los restaurantes desde el servidor
  const obtenerRestaurantesAxios = () => {
    axios.get(ENDPOINTS.RESTAURANTES)
      .then(response => setRestaurantes(response.data))
      .catch(error => console.error('Error al obtener los restaurantes:', error));
  };

  //Se agrega un nuevo restaurante al servidor
  const agregarRestauranteAxios = (nuevoRestaurante) => {
    console.log('🚀 Enviando restaurante:', nuevoRestaurante);
    console.log('🌐 URL:', ENDPOINTS.RESTAURANTES);
    
    axios.post(ENDPOINTS.RESTAURANTES, nuevoRestaurante)
      .then(response => {
        console.log('✅ Respuesta exitosa:', response);
        console.log('📦 Data recibida:', response.data);
        setRestaurantes(prev => [...prev, response.data]);
      })
      .catch(error => {
        console.error('❌ Error completo:', error);
        console.error('📋 Error response:', error.response);
        console.error('📄 Error data:', error.response?.data);
        console.error('🔢 Status code:', error.response?.status);
      });
  };

  //Se elimina un restaurante del servidor
  const eliminarRestauranteAxios = (id) => {
    console.log('🗑️ Eliminando restaurante con id:', id);
    console.log('🌐 URL:', `${ENDPOINTS.RESTAURANTES}/${id}`);
    
    axios.delete(`${ENDPOINTS.RESTAURANTES}/${id}`)
      .then(() => {
        console.log('✅ Restaurante eliminado exitosamente');
        setRestaurantes(prev => prev.filter(restaurante => 
          (restaurante._id || restaurante.id) !== id
        ));
      })
      .catch(error => {
        console.error('❌ Error al eliminar el restaurante:', error);
        console.error('📋 Error response:', error.response?.data);
        console.error('🔢 Status code:', error.response?.status);
      });
  };
     
  //Se actualiza un restaurante en el servidor
  const actualizarRestaurante = (restauranteActualizado) => {
    const id = restauranteActualizado._id || restauranteActualizado.id;
    console.log('📝 Actualizando restaurante:', restauranteActualizado);
    
    axios.put(`${ENDPOINTS.RESTAURANTES}/${id}`, restauranteActualizado)
      .then(response => {
        console.log('✅ Restaurante actualizado:', response.data);
        setRestaurantes(prev => prev.map(restaurante => 
          (restaurante._id || restaurante.id) === id ? response.data : restaurante
        ));
      })
      .catch(error => {
        console.error('❌ Error al actualizar el restaurante:', error);
        console.error('📋 Error response:', error.response?.data);
      });
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
    const id = restaurante._id || restaurante.id; // Usar _id si existe, sino id
    console.log('🎯 Eliminando restaurante en index:', index, 'con id:', id);
    eliminarRestauranteAxios(id);
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
            <Route path='/actualizar/:id' element={
            <ActualizarRestaurante
            state={state}
            setState={setState}
            actualizarRestaurante={actualizarRestaurante}
            />
            } 
            />
          <Route
            path="/lista"
            element={
              <ListaRestaurantes
                restaurantes={restaurantes}
                handleEliminar={eliminarRestaurante}
                obtenerRestaurantes={obtenerRestaurantesAxios}
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



import Restaurante from './Restaurante';
import {useNavigate} from 'react-router-dom';
import React, { useState } from 'react'; // Quitar useEffect

function ListaRestaurantes({
  restaurantes, 
  handleEliminar,
  obtenerRestaurantes
}) {
  // ELIMINAR ESTE useEffect - está causando el problema
  // useEffect(() => {
  //   console.log('🔄 ListaRestaurantes montado, refrescando datos...');
  //   obtenerRestaurantes();
  // }, []);

  const [mensajeErrorLikesNegativos, setMensajeErrorLikesNegativos] = useState("");
  const [likesTotales, setLikesTotales] = useState(0);
  
  const SumarLikes = () => setLikesTotales((prev) => prev + 1);

  const RestarDislikes = () => {
    if (likesTotales <= 0) {
      mensajeErrorLikesNegativo("No se puede restar más likes");
      return;
    }
    setLikesTotales((prev) => prev - 1);
  };

  const mensajeErrorLikesNegativo = (mensaje) => {
    setMensajeErrorLikesNegativos(mensaje);
    setTimeout(() => setMensajeErrorLikesNegativos(""), 3000);
  };

  const navigate = useNavigate();

  const handleInicio = () => {
    navigate("/");  
  }

  const handleCrear = () => {
    navigate("/crear");
  }

  return (
    <div className="ListaRestaurantes">
      <button onClick={handleInicio}>Volver al Inicio</button>
      <br />
      <button onClick={handleCrear}>Crear nuevo restaurante</button>
      <br />
      
      <h1>Cantidad likes: {likesTotales}</h1>
      {mensajeErrorLikesNegativos && (
        <h2 style={{ color: "red" }}>{mensajeErrorLikesNegativos}</h2>
      )}
      
      {restaurantes.map((restaurante, index) => (
        <Restaurante
          key={restaurante._id || restaurante.id || index}
          id={restaurante._id || restaurante.id}
          nombre={restaurante.nombre}
          direccion={restaurante.direccion}
          tipo={restaurante.tipo}
          reputacion={restaurante.reputacion}
          UrlImagen={restaurante.UrlImagen || restaurante.url}
          SumarLikes={SumarLikes}
          RestarDislikes={RestarDislikes}
          mensajeErrorLikesNegativo={mensajeErrorLikesNegativo}
          index={index}
          handleEliminar={handleEliminar}
        />
      ))}
    </div>
  );
}

export default ListaRestaurantes;

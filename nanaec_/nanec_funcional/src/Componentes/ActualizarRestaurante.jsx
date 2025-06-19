import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import "./ActualizarRestaurante.css";
import axios from "axios";
//import { Link  } from "react-router-dom";
function ActualizarRestaurante (props){
   const {actualizarRestaurante} = props;

   //Con el useParams se obtiene el id del restaurante a actualizar
    const {id} = useParams();

    useEffect(() => {
        //cargarRestaurante();
    }, []);

    const cargarRestaurante = () => {
        axios.get("http://localhost:3001/restaurantes/" + id)
        .then(response => {
            console.log(response.data);
            const restaurante = response.data;
            props.setState({
                nombre: restaurante.nombre,
                direccion: restaurante.direccion,
                tipo: restaurante.tipo,
                reputacion: restaurante.reputacion,
                UrlImagen: restaurante.UrlImagen
            });
        })
    }

    const handlerGuardar = () => {
        const restauranteActualizado = {
            nombre: props.state.nombre,
            direccion: props.state.direccion,
            tipo: props.state.tipo,
            reputacion: props.state.reputacion,
            UrlImagen: props.state.UrlImagen
        };

        props.actualizarRestaurante(restauranteActualizado);
        alert("Restaurante actualizado exitosamente");
        //Se limpia el formulario
        (props.setState({nombre:"", direccion:"", tipo:"", reputacion:"", UrlImagen:""}))
    }

    const navigate = useNavigate();

    const handleInicio = () => {
        navigate("/");
    }

    const handleLista = () => {
        navigate("/lista");
    }

    return (    
        <div className="ActualizarRestaurante">
           
            <button onClick={handleInicio}>Volver al Inicio</button>
            <br />
            <button onClick={handleLista}>Ver lista</button>
            <br />
           
            <label>Nombre:</label>
            <input type="text" value={props.state.nombre} onChange={(e) => props.setState({...props.state, nombre: e.target.value})} />
            <label>Dirección:</label>
            <input type="text" value={props.state.direccion} onChange={(e) => props.setState({...props.state, direccion: e.target.value})} />
            <label>Tipo:</label>
            <select
                value={props.state.tipo}
                onChange={(e) => props.setState({ ...props.state, tipo: e.target.value })}
            >
                <option value="">Seleccione un tipo</option>
                <option value="Italiana">Italiana</option>
                <option value="China">China</option>
                <option value="Mexicana">Mexicana</option>
                <option value="Japonesa">Japonesa</option>
                <option value="Vegetariana">Vegetariana</option>
            </select>
            <label>Reputación:</label>
            <input type="number" value={props.state.reputacion} onChange={(e) => props.setState({...props.state, reputacion: e.target.value})} />
            <label>URL Imagen:</label>
            <input type="text" value={props.state.UrlImagen} onChange={(e)=> props.setState({...props.state,UrlImagen: e.target.value})}/>
            
            
            
            <button onClick={handlerGuardar}>Guardar</button>
            
        </div>  
    );      
}

export default ActualizarRestaurante;

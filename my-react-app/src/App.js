import React, { Component } from 'react';
import './App.css';

//componente con valores iniciales.

class App extends Component {
  constructor() {
    super();
    this.state = {
      status: 'Pending', // Estado inicial: Pendiente
      data: null, // Los datos iniciales están vacíos
      error: null, // No hay errores iniciales
    };
  }

  // Función que simula una solicitud asincrónica utilizando una promesa
  fetchData = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const randomNumber = Math.random();
        if (randomNumber > 0.5) {
          resolve('Datos cargados exitosamente'); // Resuelve la promesa con éxito
        } else {
          reject('Error al cargar los datos'); // Rechaza la promesa con un error
        }
      }, 2000); // tomará 2 segundos en completarse
    });
  };

  // Manejador de evento para cargar datos cuando se hace clic en el botón
  handleFetchData = () => {
    // Cambia el estado a "Pending" para indicar que se está realizando una solicitud.
    this.setState({ status: 'Pending' });

    // Llama a la función fetchData para simular una solicitud asincrónica.
    this.fetchData()
      .then(data => {
        // Cuando la promesa se resuelve con éxito,  
        //actualiza el estado con los datos y cambia el estado a "Fulfilled"(cumplida).
        this.setState({ status: 'Fulfilled', data });
      })
      .catch(error => {
        // Si la promesa se rechaza con un error, 
        //actualiza el estado con el error y cambia el estado a "Rejected"(rechazado).
        this.setState({ status: 'Rejected', error });
      });
  };

  // Renderización de la interfaz de usuario 
  //basada en el estado actual del componente.
  
  render() {
    const { status, data, error } = this.state;

    return (
      <div className="app">
        <h1>Mis Promesas</h1>
        <p>Estado: {status}</p>
        <div className="button-container">
          {/* Botón que llama a handleFetchData cuando se hace clic */}
          <button onClick={this.handleFetchData}>Cargar Datos</button>
        </div>
        {/* Condicionalmente muestra mensajes basados en el estado */}
        {status === 'Pending' && <p className="loading">Cargando datos...</p>}
        {status === 'Fulfilled' && <p className="data">Datos: {data}</p>}
        {status === 'Rejected' && <p className="error">Error: {error}</p>}
      </div>
    );
  }
}


export default App;
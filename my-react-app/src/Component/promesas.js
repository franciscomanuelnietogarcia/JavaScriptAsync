// import React, { Component } from 'react';

// class App extends Component {
//     constructor() {
//       super();
//       this.state = {
//         data: null,
//         loading: true,
//         error: null,
//       };
//     }
  
//     componentDidMount() {
//       // Simulamos una solicitud de datos asincrónica
//       this.fetchData()
//         .then(data => {
//           this.setState({
//             data,
//             loading: false,
//           });
//         })
//         .catch(error => {
//           this.setState({
//             error,
//             loading: false,
//           });
//         });
//     }
  
//     fetchData() {
//       return new Promise((resolve, reject) => {
//         // Simulamos una solicitud de datos que toma 2 segundos en completarse
//         setTimeout(() => {
//           const exito = true;
//           if (exito) {
//             resolve("¡Datos cargados exitosamente!");
//           } else {
//             reject("Error al cargar los datos.");
//           }
//         }, 2000);
//       });
//     }
  
//     render() {
//       const { data, loading, error } = this.state;
  
//       return (
//         <div>
//           {loading && <p>Cargando datos...</p>}
//           {data && <p>{data}</p>}
//           {error && <p>Error: {error}</p>}
//         </div>
//       );
//     }
//   }
  
//   export default App;
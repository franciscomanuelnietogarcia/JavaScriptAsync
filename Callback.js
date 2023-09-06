// Simulación de una función de búsqueda de vuelos con un callback
function buscarVuelos(origen, destino, fechaSalida, callback) {
    // Supongamos que aquí se realizaría una solicitud real a una API de vuelos
    // En este ejemplo, generamos resultados aleatorios
    const vuelosDisponibles = [
      { origen: "Nueva York", destino: "Londres", fecha: "2023-09-15", precio: 800 },
      { origen: "Nueva York", destino: "París", fecha: "2023-09-15", precio: 900 },
      { origen: "Nueva York", destino: "Roma", fecha: "2023-09-15", precio: 1000 },
      { origen: "Los Ángeles", destino: "Londres", fecha: "2023-09-15", precio: 850 },
      { origen: "Los Ángeles", destino: "París", fecha: "2023-09-15", precio: 950 },
      { origen: "Los Ángeles", destino: "Roma", fecha: "2023-09-15", precio: 1050 },
      { origen: "Chicago", destino: "Londres", fecha: "2023-09-15", precio: 900 },
      { origen: "Chicago", destino: "París", fecha: "2023-09-15", precio: 1000 },
      { origen: "Chicago", destino: "Roma", fecha: "2023-09-15", precio: 1100 },
    ];
  
    // Filtrar los vuelos disponibles según los parámetros
    const resultados = vuelosDisponibles.filter((vuelo) => {
      return vuelo.origen === origen && vuelo.destino === destino && vuelo.fecha === fechaSalida;
    });
  
    // Simular una demora de 1 segundo antes de llamar al callback
    setTimeout(function () {
      callback(resultados);
    }, 1000);
  }
  
  // Manejar la solicitud de búsqueda de vuelos
  document.getElementById("flightForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const origen = document.getElementById("origin").value;
    const destino = document.getElementById("destination").value;
    const fechaSalida = document.getElementById("departureDate").value;
  
    const flightResults = document.getElementById("flightResults");
    flightResults.innerHTML = "<p>Buscando vuelos...</p>";
  
    // Realizar la búsqueda de vuelos y mostrar los resultados en el callback
    buscarVuelos(origen, destino, fechaSalida, function (resultados) {
      if (resultados.length === 0) {
        flightResults.innerHTML = "<p>No se encontraron vuelos disponibles para esta fecha y ruta.</p>";
      } else {
        let html = "<h2>Resultados de la Búsqueda:</h2>";
        html += "<ul>";
        resultados.forEach(function (vuelo) {
          html += `<li>Origen: ${vuelo.origen}, Destino: ${vuelo.destino}, Fecha: ${vuelo.fecha}, Precio: $${vuelo.precio}</li>`;
        });
        html += "</ul>";
        flightResults.innerHTML = html;
      }
    });
  });
function cargarDatos() {
    fetch('http://3.231.156.172/api/devices')
      .then(response => {
        if (!response.ok) throw new Error('Error en la respuesta de la API');
        return response.json();
      })
      .then(data => {
        const tbody = document.getElementById('device-table-body');
        tbody.innerHTML = ''; // Limpiar contenido anterior
  
        data.forEach(dispositivo => {
          const fila = document.createElement('tr');
  
          fila.innerHTML = `
            <td>${dispositivo.ip}</td>
            <td>${dispositivo.name}</td>
            <td>${dispositivo.status}</td>
            <td>${dispositivo.date}</td>
          `;
  
          tbody.appendChild(fila);
        });
      })
      .catch(error => {
        console.error('Error al cargar los datos:', error);
      });
  }
  
  // Ejecutar la función cada 2 segundos
  setInterval(cargarDatos, 2000);
  
  // También cargar inmediatamente al inicio
  cargarDatos();
  
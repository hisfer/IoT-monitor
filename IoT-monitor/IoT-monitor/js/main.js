// Función para obtener los datos de la API y actualizar la tabla
function fetchData() {
    fetch('http://127.0.0.1:80/api/devices')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta de la API');
            }
            return response.json();
        })
        .then(data => {
            console.table(data.devices);  // Verifica los datos que se reciben

            // Asegurarse de que los datos sean un arreglo de objetos con las propiedades correctas
            if (Array.isArray(data.devices) && data.devices.length > 0) {
                // Obtener el cuerpo de la tabla
                const tbody = document.querySelector('#deviceTable tbody');
                tbody.innerHTML = ''; // Limpiar la tabla antes de llenarla

                // Recorrer los datos y agregar filas a la tabla
                //console.log(data.devices);
                data.devices.forEach(device => {
                     // Verifica cómo se ve cada objeto de dispositivo

                    // Asegurarse de que el dispositivo tenga las propiedades correctas
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${device.id || 'N/A'}</td>
                        <td>${device.name || 'N/A'}</td>
                        <td>${device.ip || 'N/A'}</td>
                        <td>${device.status || 'N/A'}</td>
                        <td>${device.date || 'N/A'}</td>
                    `;
                    tbody.appendChild(row);
                });
            } else {
                console.error('Los datos no están en el formato esperado o están vacíos');
            }
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });
}

// Llamar a la función fetchData inicialmente y luego cada 2 segundos
fetchData();
setInterval(fetchData, 2000); // Actualizar cada 2 segundos

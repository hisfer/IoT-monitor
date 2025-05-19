document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'http://127.0.0.1:80/api/devices'; 
    const historial = document.getElementById('historial');
    const estadoMovimiento = document.getElementById('estadoMovimiento');
    
    // Variable global para almacenar la IP
let ipGlobal = null;

// Función para obtener y guardar la IP
const obtenerIP = async () => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');

    if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Error en la petición: ${errorData.error || 'desconocido'}`);
}
    
    const data = await response.json();
    ipGlobal = data.ip; // Guardamos en variable global
    console.log('IP obtenida:', ipGlobal);
    
  } catch (error) {
    console.error('Falló la obtención de IP:', error);
    ipGlobal = '192.168.1.100'; // Valor por defecto
  }
};

// Ejecutar al cargar la aplicación
window.addEventListener('DOMContentLoaded', obtenerIP);

// Función de ejemplo que usa la IP
const funcionQueUsaIP = () => {
  if (ipGlobal) {
    console.log('Usando IP guardada:', ipGlobal);
    // Aquí tu lógica usando ipGlobal
  } else {
    console.log('IP aún no está disponible');
    // Opcional: volver a intentar obtener la IP
  }
};

    // Mapeo de acciones a estados
    const estados = {
        'AVANZAR': 'AVANZANDO',
        'RETROCEDER': 'RETROCEDIENDO',
        'VUELTA_IZQ': 'GIRANDO IZQUIERDA',
        'VUELTA_DER': 'GIRANDO DERECHA',
        'GIRO_90_IZQ': 'GIRO 90° IZQ',
        'GIRO_90_DER': 'GIRO 90° DER',
        'GIRO_360_IZQ': 'GIRO 360° IZQ',
        'GIRO_360_DER': 'GIRO 360° DER',
        'DETENER': 'DETENIDO'
    };

    // Configuración común para las peticiones
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };

    document.querySelectorAll('[data-action]').forEach(button => {
        button.addEventListener('click', async () => {
            const action = button.dataset.action;
            
            try {
                // Actualizar estado inmediatamente
                estadoMovimiento.textContent = estados[action] || 'ACTIVO';
                
                // Enviar comando a la API
                const response = await fetch(API_URL, {
                    ...requestOptions,
                    body: JSON.stringify({
                        name: "FERNANDO",
                        ip: ipGlobal,
                        status: action
                    })
                });

                if (!response.ok) throw new Error('Error en la petición');
                
                // Actualizar historial
                const entry = document.createElement('div');
                entry.className = 'text-success';
                entry.innerHTML = `✅ ${new Date().toLocaleTimeString()}: ${action.replace(/_/g,' ')}`;
                historial.prepend(entry);
                
                // Mantener máximo 5 entradas
                if (historial.children.length > 5) historial.lastChild.remove();
                
            } catch (error) {
                estadoMovimiento.textContent = 'ERROR';
                const errorEntry = document.createElement('div');
                errorEntry.className = 'text-danger';
                errorEntry.textContent = `❌ ${new Date().toLocaleTimeString()}: ${error.message}`;
                historial.prepend(errorEntry);
            }
        });
    });
});
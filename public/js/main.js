fetch('/api/eventos')
  .then(res => res.json())
  .then(data => {
    const contenedor = document.getElementById('eventos-container');
    data.forEach(evento => {
      const div = document.createElement('div');
      div.className = 'evento';
      div.innerHTML = `
        <h3>${evento.titulo}</h3>
        <p><strong>Fecha:</strong> ${evento.fecha}</p>
        <p>${evento.descripcion}</p>
      `;
      contenedor.appendChild(div);
    });
  })
  .catch(err => {
    console.error('Error al cargar eventos:', err);
  });
// Obtener datos de la VTC desde la API de TruckersMP
fetch('https://api.truckersmp.com/v2/vtc/80820')
  .then(res => res.json())
  .then(data => {
    if (data && data.response && data.response.members_count) {
      const cantidad = data.response.members_count;
      document.getElementById('contador-conductores').textContent = `+${cantidad}`;
    }
  })
  .catch(err => {
    console.error('Error al cargar datos de TruckersMP:', err);
    document.getElementById('contador-conductores').textContent = '+12'; // valor por defecto
  });

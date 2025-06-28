const axios = require('axios');
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Servir archivos estáticos desde /public
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para API de eventos
app.get('/api/eventos', (req, res) => {
  const filePath = path.join(__dirname, 'api', 'events.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Error al leer eventos' });
    res.json(JSON.parse(data));
  });
});

// Servir el index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/miembros', async (req, res) => {
  try {
    const vtcId = 80820;
    const response = await axios.get(`https://api.truckersmp.com/v2/vtc/${vtcId}/members`);
    const miembros = response.data.response;

    // Puedes filtrar o transformar si deseas, pero aquí lo devolvemos directo
    res.json(miembros);
  } catch (error) {
    console.error('Error al obtener miembros de la VTC:', error.message);
    res.status(500).json({ error: 'No se pudieron obtener los miembros de la VTC' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

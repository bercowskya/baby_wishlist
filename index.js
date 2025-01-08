/*******************************************************
 * index.js - Servidor Node para proxy de Grist
 * Compatible con Node 18+ (usa la fetch nativa).
 *******************************************************/

const express = require('express');
const cors = require('cors');

const app = express();

// Habilita CORS para que tu HTML (en otro puerto) pueda llamar sin error
app.use(cors());

// Para parsear JSON en el body de las peticiones
app.use(express.json());

// ============================
// CONFIGURACIÓN: TUS DATOS
// ============================
const API_KEY  = 'de6cd8623e895f90dc20560a23fa3750ead205ca'; // <-- Tu API Key de Grist
const DOC_ID   = 'f6hEYgYCQLGC';                             // <-- Tu docId
const TABLE_ID = 'Table1';                                    // <-- Nombre exacto de tu tabla

// Si tu doc está en docs.getgrist.com:
const BASE_URL = 'https://docs.getgrist.com/api/docs';
// Si estuviera en app.getgrist.com, usarías:
// const BASE_URL = 'https://app.getgrist.com/api/docs';

// ---------------------------------------------
// ENDPOINT 1: Obtener todos los registros (GET)
// ---------------------------------------------
app.get('/api/get-records', async (req, res) => {
  try {
    const url = `${BASE_URL}/${DOC_ID}/tables/${TABLE_ID}/records`;
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).send(errorText);
    }

    const data = await response.json();
    // data.records -> array de { id, fields: {...} }
    res.json(data);

  } catch (err) {
    console.error('Error /api/get-records:', err);
    res.status(500).send(err.message);
  }
});

// ---------------------------------------------
// ENDPOINT 2: Actualizar (PATCH) un registro
// ---------------------------------------------
app.patch('/api/update-record/:recordId', async (req, res) => {
  try {
    // El ID llega como string
    const recordIdStr = req.params.recordId;
    // Convertimos a número para Grist
    const recordIdNum = parseInt(recordIdStr, 10);

    // Campos a actualizar, p.ej. { Es_regalo_: "Si", Estado: "Comprado", Nota: "Alice" }
    const fieldsToUpdate = req.body;

    const patchBody = {
      records: [
        {
          id: recordIdNum,
          fields: fieldsToUpdate
        }
      ]
    };

    const url = `${BASE_URL}/${DOC_ID}/tables/${TABLE_ID}/records`;
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(patchBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).send(errorText);
    }

    const data = await response.json();
    res.json(data);

  } catch (err) {
    console.error('Error /api/update-record:', err);
    res.status(500).send(err.message);
  }
});

// ---------------------------------------------
// Arrancar el servidor en el puerto 3000
// ---------------------------------------------
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

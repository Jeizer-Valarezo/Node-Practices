const express = require('express');
const dotenv = require('dotenv');
const planetRouter = require('./planetRouter'); // Importa el enrutador de planetas

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para analizar las solicitudes JSON
app.use(express.json());

// Middleware para registrar las solicitudes de clientes
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Usa el enrutador de planetas
app.use(planetRouter);

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`El servidor está funcionando en el puerto http://localhost:${PORT}`);
});

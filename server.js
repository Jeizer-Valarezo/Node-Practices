const express = require('express');
const dotenv = require('dotenv');
const planetRouter = require('./planetRouter');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(planetRouter);

app.listen(PORT, () => {
  console.log(`El servidor está funcionando en el puerto http://localhost:${PORT}`);
});

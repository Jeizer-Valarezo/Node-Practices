const express = require('express');
const { setupDb } = require('./controllers/db');
const router = require('./Router');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(router);

setupDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.error('Error setting up database:', error.message);
  });

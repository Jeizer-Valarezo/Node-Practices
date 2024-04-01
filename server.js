const express = require('express');
const dotenv = require('dotenv');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


let planets = [
  {
    id: 1,
    name: "Earth",
  },
  {
    id: 2,
    name: "Mars",
  },
];


app.use(express.json());


app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});


app.get('/planets', (req, res) => {
  res.json(planets);
});

app.post('/planets', (req, res) => {
  const { name } = req.body;
  const id = planets.length + 1;
  planets.push({ id, name });
  res.status(201).json({ message: 'Planet added successfully', newPlanet: { id, name } });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

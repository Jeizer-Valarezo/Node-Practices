const express = require('express');
const Joi = require('joi');

const router = express.Router();

// Dummy database of planets
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

// Joi schema for planet validation
const planetSchema = Joi.object({
  id: Joi.number().integer().min(1),
  name: Joi.string().required(),
});

// Middleware to validate planet data
const validatePlanet = (req, res, next) => {
  const { error } = planetSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

// Routes
router.get('/api/planets', (req, res) => {
  res.json(planets);
});

router.get('/api/planets/:id', (req, res) => {
  const planet = planets.find(p => p.id === parseInt(req.params.id));
  if (!planet) {
    return res.status(404).json({ error: 'Planet not found' });
  }
  res.json(planet);
});

router.post('/api/planets', validatePlanet, (req, res) => {
  const { name } = req.body;
  const id = planets.length + 1;
  planets.push({ id, name });
  res.status(201).json({ msg: 'Planet created successfully' });
});

router.put('/api/planets/:id', validatePlanet, (req, res) => {
  const { id } = req.params;
  const planetIndex = planets.findIndex(p => p.id === parseInt(id));
  if (planetIndex === -1) {
    return res.status(404).json({ error: 'Planet not found' });
  }
  planets[planetIndex].name = req.body.name;
  res.status(200).json({ msg: 'Planet updated successfully' });
});

router.delete('/api/planets/:id', (req, res) => {
  const { id } = req.params;
  const planetIndex = planets.findIndex(p => p.id === parseInt(id));
  if (planetIndex === -1) {
    return res.status(404).json({ error: 'Planet not found' });
  }
  planets.splice(planetIndex, 1);
  res.status(200).json({ msg: 'Planet deleted successfully' });
});

module.exports = router;

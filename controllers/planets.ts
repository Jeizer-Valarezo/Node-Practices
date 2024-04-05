import { Request, Response } from 'express';

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

export const getAll = (req: Request, res: Response) => {
  res.json(planets);
};

export const getOneById = (req: Request, res: Response) => {
  const planet = planets.find(p => p.id === parseInt(req.params.id));
  if (!planet) {
    return res.status(404).json({ error: 'Planet not found' });
  }
  res.json(planet);
};

export const create = (req: Request, res: Response) => {
  const { name } = req.body;
  const id = planets.length + 1;
  planets.push({ id, name });
  res.status(201).json({ msg: 'Planet created successfully' });
};

export const updateById = (req: Request, res: Response) => {
  const { id } = req.params;
  const planetIndex = planets.findIndex(p => p.id === parseInt(id));
  if (planetIndex === -1) {
    return res.status(404).json({ error: 'Planet not found' });
  }
  planets[planetIndex].name = req.body.name;
  res.status(200).json({ msg: 'Planet updated successfully' });
};

export const deleteById = (req: Request, res: Response) => {
  const { id } = req.params;
  const planetIndex = planets.findIndex(p => p.id === parseInt(id));
  if (planetIndex === -1) {
    return res.status(404).json({ error: 'Planet not found' });
  }
  planets.splice(planetIndex, 1);
  res.status(200).json({ msg: 'Planet deleted successfully' });
};

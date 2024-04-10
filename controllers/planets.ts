import { Request, Response } from 'express';
import db from './db'; 

export const getAll = async (req: Request, res: Response) => {
  try {
    const planets = await db.any('SELECT * FROM planets');
    res.json(planets);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getOneById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const planet = await db.oneOrNone('SELECT * FROM planets WHERE id = $1', id);
    if (!planet) {
      return res.status(404).json({ error: 'Planet not found' });
    }
    res.json(planet);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const create = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    await db.none('INSERT INTO planets (name) VALUES ($1)', name);
    res.status(201).json({ msg: 'Planet created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  try {
    await db.none('UPDATE planets SET name = $1 WHERE id = $2', [name, id]);
    res.status(200).json({ msg: 'Planet updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    await db.none('DELETE FROM planets WHERE id = $1', id);
    res.status(200).json({ msg: 'Planet deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const setupDb = async () => {
  try {
    await db.none(`
      DROP TABLE IF EXISTS planets;

      CREATE TABLE planets (
        id SERIAL NOT NULL PRIMARY KEY,
        name TEXT NOT NULL
      );
    `);

    await db.none(`INSERT INTO planets (name) VALUES ('Earth')`);
    await db.none(`INSERT INTO planets (name) VALUES ('Mars')`);

    console.log('Database setup completed');
  } catch (error) {
    console.error('Error setting up database:', error.message);
  }
};

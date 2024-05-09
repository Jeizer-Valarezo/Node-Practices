const { Request, Response } = require('express');
const { db } = require('./db');

const getAll = async (req, res) => {
  try {
    const planets = await db.any('SELECT * FROM planets');
    res.json(planets);
  } catch (error) {
    console.log(error)
  }
};

const getOneById = async (req, res) => {
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

const create = async (req, res) => {
  const { name } = req.body;
  try {
    await db.none('INSERT INTO planets (name) VALUES ($1)', name);
    res.status(201).json({ msg: 'Planet created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateById = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  try {
    await db.none('UPDATE planets SET name = $1 WHERE id = $2', [name, id]);
    res.status(200).json({ msg: 'Planet updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await db.none('DELETE FROM planets WHERE id = $1', id);
    res.status(200).json({ msg: 'Planet deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createImage = async (req, res) => {
  const id = parseInt(req.params.id);
  const imagePath = req.file.path;

  try {
    await db.none('UPDATE planets SET image = $1 WHERE id = $2', [imagePath, id]);
    res.status(201).json({ msg: 'Planet image uploaded successfully.' });
  } catch (error) {
    fs.unlinkSync(imagePath);
    res.status(500).json({ error: 'Internal server error' });
  }
};



module.exports = { getAll, getOneById, create, updateById, deleteById, createImage };

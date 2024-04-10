const express = require('express');
const { getAll, getOneById, create, updateById, deleteById } = require('./controllers/planets');

const router = express.Router();

router.get('/planets', getAll);

router.get('/planets/:id', getOneById);

router.post('/planets', create);

router.put('/planets/:id', updateById);

router.delete('/planets/:id', deleteById);

module.exports = router;

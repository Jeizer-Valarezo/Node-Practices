const express = require('express');
const { getAll, getOneById, create, updateById, deleteById } = require('./controllers/planets');

const router = express.Router();

// Routes
router.get('/api/planets', getAll);

router.get('/api/planets/:id', getOneById);

router.post('/api/planets', create);

router.put('/api/planets/:id', updateById);

router.delete('/api/planets/:id', deleteById);

module.exports = router;

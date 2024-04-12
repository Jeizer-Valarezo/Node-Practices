const express = require('express');
const { getAll, getOneById, create, updateById, deleteById, createImage } = require('./controllers/planets');

const router = express.Router();
const upload = require('./multer-config');


router.get('/planets', getAll);

router.get('/planets/:id', getOneById);

router.post('/planets', create);

router.put('/planets/:id', updateById);

router.delete('/planets/:id', deleteById);

router.post('/planets/:id/image', upload.single("image"), createImage)

module.exports = router;

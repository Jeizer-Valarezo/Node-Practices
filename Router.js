const express = require('express');
const { getAll, getOneById, create, updateById, deleteById, createImage } = require('./controllers/planets.js');
const { logIn, signUp } = require('./controllers/users.js')
const router = express.Router();
const upload = require('./multer-config.js');


router.get('/planets', getAll);
router.get('/planets/:id', getOneById);
router.post('/planets', create);
router.put('/planets/:id', updateById);
router.delete('/planets/:id', deleteById);

router.post('/planets/:id/image', upload.single("image"), createImage);

router.post('/users/login', logIn);
router.post('/users/signup', signUp);

module.exports = router;

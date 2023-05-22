/**
 * Rutas de Usuarios / Auth
 * host + /api/auth
 */
const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();


const { createUser, logginUser, revalidateToken } = require('../controllers/auth');
const { fieldValidator } = require('../middlewares/field-validator');

const { validateJwt } = require('../middlewares/validate-jwt');

router.post('/new',
    [//middlewares
        check('name', 'El nombre es obligatorio.').not().isEmpty(),
        check('email', 'El email es obligatorio.').isEmail(),
        check('password', 'El password debe de temer más de 6 carácteres.').isLength({ min: 6 }),
        fieldValidator
    ],
    createUser);

router.post(
    '/',
    [
        check('email', 'El Email es incorrecto').isEmail(),
        check('password', 'La contraseña es incorrecta').isLength({ min: 6 }),
        fieldValidator
    ],
    logginUser);

router.get('/renew', validateJwt, revalidateToken);


module.exports = router;
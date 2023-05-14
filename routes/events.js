const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/field-validator');
const { isDate } = require('../helpers/isDate');



const router = Router();
const { validateJwt } = require('../middlewares/validate-jwt');
const { getEvent, createEvent, updateEvent, deleteEvent } = require('../controllers/events');





router.use(validateJwt)
//Todos deben de pasar por la validación del JWT token
//middleware inplicito -> router.use(validateJwt)
//Obtener eventos
router.get('/', getEvent);

//Crear evento
router.post('/',
    [
        check('title', 'El titulo es obigatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalización es obligatoria').custom(isDate),
        fieldValidator,
    ],
    createEvent
);


//Actualizar evento
router.put('/:id',
    [
        check('title', 'El titulo es obigatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalización es obligatoria').custom(isDate),
        fieldValidator,
    ],
    updateEvent
);


//Actualizar evento
router.delete('/:id', deleteEvent);


//router.get('/', validateJwt, getEvent);
//router.post('/', validateJwt, createEvent);
//router.put('/:id', validateJwt, updateEvent);
//router.delete('/:id', validateJwt, deleteEvent);


module.exports = router;
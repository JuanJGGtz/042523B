const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
//const { validationResult } = require('express-validator');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) => {

    const { email, password } = req.body
    //Manejo de errores manual
    /* if (name.length < 3) {
        return res.status(400).json({
            ok: false,
            msg: 'Name incorrect!'
        });
    } */

    //Manejo de errores usando middleware "express-validator"
    /* const errors = validationResult(req);
    //console.log('errors', errors)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    } */


    try {
        //Promesa Revisar el correo
        let user = await User.findOne({ email })

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correo'
            });
        }

        user = new User(req.body);

        //Encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        //Generar JWT
        const token = await generateJWT(user.id, user.name);

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })

    } catch (error) {
        console.log('MongoDB Save:', error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}


const logginUser = async (req, res = response) => {
    const { name, email, password } = req.body;
    try {

        let user = await User.findOne({ email: email });

        if (!user) {
            res.status(400).json({
                ok: false,
                msg: 'Usuario o contraseña incrrecta'
            });
            return;
        }

        const validatePassword = bcrypt.compareSync(password, user.password);
        if (!validatePassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario o contraseña incrrecta'
            });
        }

        //Generar JWT
        const token = await generateJWT(user.id, user.name);

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })
    } catch (error) {
        console.log('MongoDB Login:', error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
};


const revalidateToken = async (req, res = response) => {

    const { uid, name } = req;

    //Generar JWT
    const token = await generateJWT(uid, name);

    res.status(201).json({
        ok: true,
        uid,
        name,
        token,
    })
};


module.exports = {
    createUser,
    logginUser,
    revalidateToken
};
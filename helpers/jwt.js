const jwt = require('jsonwebtoken');

const generateJWT = (uid, name) => {

    return new Promise((resolve, reject) => {
        const payload = { uid, name };
        //Si se cambia el valor de la variabe de entorno *SECRET_JWT_SEED* todos los tokens dejan de funcionar, porque no harían match
        //Esto puede servir para forzar a los usuarios a generar un nuevo JWT 
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        },(error,token)=>{
            
            if (error) {
                console.log('JWT:', error);    
                reject('No se pudo generar el token')
            }

            resolve(token);
        });
    });
}


module.exports = {
    generateJWT,
}
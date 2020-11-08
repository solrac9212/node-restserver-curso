//
//verificar token
//
const jwt = require('jsonwebtoken');
let verificaToken = (req, res, next) => {
    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decode) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: 'Token no valido'
            });
        }

        req.usuario = decode.usuario;
        next();
    });



};


//verifica admin rol
let verificaAdminRol = (req, res, next) => {
    let usuario = req.usuario;
    if (usuario.role == 'ADMIN_ROLE') {

        next();
        return;
    } else {
        return res.json({
            ok: false,
            message: 'El usuario no es administrador'
        });
    }
};

module.exports = {
    verificaToken,
    verificaAdminRol
}
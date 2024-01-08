const bcrypt  = require('bcrypt');
const CICLOS = 10;
const SALT = bcrypt.genSaltSync(CICLOS);

const crypto = require('crypto');
const ALGORITMO = 'aes-128-gcm';
const PASSWORD = 'pass 16 caracter';
const INICIAL = crypto.randomBytes(16);

const JWT = require('jsonwebtoken');
const SECRET_PASS = 'clave_secreta_para_mi_evaluacion_tecnica';

const HASH = (password) => {
    const PASS_HASH = bcrypt.hashSync(password, SALT);
    return PASS_HASH;
};

const ENCRIPTADO = (dato) => {
    const cifrado = crypto.createCipheriv(ALGORITMO, PASSWORD, INICIAL);
    let encriptar = cifrado.update(dato, 'utf-8', 'hex');
    encriptar += cifrado.final('hex');

    return encriptar;
};

const CREAR_TOKEN = (user_id, email) => {
    const cargar = {
        usuario_id: user_id,
        usuario: email
    };

    const token = JWT.sign(cargar, SECRET_PASS, { expiresIn: '1h' });
    return token;
};

const VALIDAR_TOKEN = (pedido, respuesta, next) => {
    const token = pedido.headers.authorization;

    try {
        const decodificado = JWT.verify(token.split(' ')[1], SECRET_PASS);
        pedido.user = decodificado;
        next();
    } catch (error) {
        return respuesta.status(401).send('Token Inválido');
    }
};

module.exports = { HASH, ENCRIPTADO, CREAR_TOKEN, VALIDAR_TOKEN };

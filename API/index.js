const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json({ limit: '100mb' })); // Cambia el límite según sea necesario
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

const mySQL = require("./connection");
const token = require("./token")

app.use(cors());
app.use(express.json());

app.post("/usuarios/login", (pedido, respuesta) => {
    const emailEncriptado = token.ENCRIPTADO(pedido.body.email);
    const passHashing = token.HASH(pedido.body.pass);

    mySQL.connection.query('SELECT id FROM usuarios WHERE (email = "' + emailEncriptado + '" AND pass = "' + passHashing + '") ', function(error, resultados) {
        if (error) throw error;
        if (resultados.length === 0)
            respuesta.send(undefined);
        else {
            const idComoCadena = resultados[0]['id'].toString();
            respuesta.send(idComoCadena);
        }
    });
});

app.post("/usuarios/create", (pedido, respuesta) => {
    const emailEncriptado = token.ENCRIPTADO(pedido.body.email);
    const passHashing = token.HASH(pedido.body.pass);
    mySQL.connection.query('INSERT INTO usuarios (email, pass) VALUES ("' + emailEncriptado + '", "' + passHashing + '")', function(error, resultados) {
        if (error) {
            throw error;

        } else {
            respuesta.send(true);
        }
    });
})

app.post("/gastos/create/:id", (pedido, respuesta) => {  
    const { monto, categoria, ruc, foto, fecha } = pedido.body;
    mySQL.connection.query('INSERT INTO gastos (monto, categoria, ruc, fotoComprobante, fecha, usuario_id) VALUES ("' + monto + '", "' + categoria + '","' + ruc + '","' + foto + '","' + fecha + '","' + pedido.params.id + '")', function(error, resultados) {
        if (error) {
            throw error;

        } else {
            respuesta.send(true);
        }
    });
})

app.get("/verGastos/:id", (pedido, respuesta) => {    
    mySQL.connection.query('SELECT Gastos.id, Gastos.monto, Gastos.categoria, Gastos.ruc, CAST(Gastos.fotoComprobante AS CHAR) AS fotoComprobanteCadena, Gastos.fecha FROM Gastos INNER JOIN Usuarios ON Gastos.usuario_id = Usuarios.id WHERE Usuarios.id = "' + pedido.params.id + '" ORDER BY Gastos.fecha DESC;', function(error, resultados) {
        if (error) throw error;
        respuesta.send(resultados);
    });
})

app.listen(3000, () => {
    console.log("El servidor esta en línea")
})
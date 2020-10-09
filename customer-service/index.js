// Importando las funciones de Fake DB y Express Framework
const db = require('./fake-db');
const express = require('express');
// Creando la instancia del servidor
const app = express();
const PORT = process.env.PORT || 3000;

// Diciendole a express que use su middleware JSON.
// Si el servidor recibe JSON en el cuerpo de una solicitud, convertirá automáticamente el JSON en un objeto JavaScript.
app.use(express.json());

/*
Configure las rutas REST para el servidor.
 Express proporciona funciones para agregar rutas. app.get () escuchará las solicitudes GET, app.post () las solicitudes POST.
 Estas funciones requieren que se escuche la parte de la URL y que se ejecute una función de devolución de llamada cuando algo llega a esta URL.
 La función de devolución de llamada para ejecutar recibe la solicitud (req) y un objeto JavaScript que contiene múltiples funciones de respuesta (res) de express.
 Al final de nuestra devolución de llamada, usamos las funciones de respuesta para cumplir con una solicitud.
*/

app.get('/', (req, res) => {
    res.send('Customer Service is up and running.');
});

app.post('/add', (req, res) => {
    res.json(db.addCustomer(req.body));
});

app.post('/update', (req, res) => {
    res.json(db.updateCustomer(req.body));
});

app.post('/delete', (req, res) => {
    res.json(db.removeCustomer(req.body.id));
});

app.post('/getAll', (req, res) => {
    res.json(db.getAllCustomers());
});

app.post('/getId', (req, res) => {
    res.json(db.getCustomerById(req.body.id));
})

// Dígale a express que escuche la comunicación en el puerto especificado una vez realizada la configuración.
app.listen(PORT, () => console.log(`Customer Service listening on ${PORT}`));
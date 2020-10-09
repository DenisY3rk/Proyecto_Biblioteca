// Importando las funciones de Fake DB y Express Framework
const db = require('./fake-db');
const express = require('express');
// Creando una instancia del servidor
const app = express();
const PORT = process.env.PORT || 3001;

// Diciendo un uso rápido de su middleware JSON.
// Si el servidor recibe JSON en el cuerpo de una solicitud, convertirá automáticamente el JSON en un objeto JavaScript.
app.use(express.json());

/*
 Configurando las rutas REST para el servidor.
 Express proporciona funciones para agregar rutas. app.get () escuchará las solicitudes GET, app.post () las solicitudes POST.
 Estas funciones requieren que se escuche la parte de la URL y que se ejecute una función de devolución de llamada cuando algo llega a esta URL.
 La función de devolución de llamada para ejecutar recibe la solicitud (req) y un objeto JavaScript que contiene múltiples funciones de respuesta (res) de express.
 Al final de nuestra devolución de llamada, usamos las funciones de respuesta para cumplir con una solicitud.
*/

app.get('/', (req, res) => {
    res.send('Book Service is up and running.');
});

app.post('/add', (req, res) => {
    res.json(db.addBook(req.body));
});

app.post('/update', (req, res) => {
    res.json(db.updateBook(req.body));
});

app.post('/delete', (req, res) => {
    res.json(db.removeBook(req.body.id));
});

app.post('/getAll', (req, res) => {
    res.json(db.getAllBooks());
});

app.post('/getId', (req, res) => {
    res.json(db.getBookById(req.body.id));
})

app.post('/setAvailable', (req, res) => {
    res.json(db.setAvailable(req.body.id));
})

// Diciendole a express que escuche la comunicación en el puerto especificado una vez realizada la configuración.
app.listen(PORT, () => console.log(`Book Service listening on ${PORT}`));
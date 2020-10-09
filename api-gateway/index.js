// Importando express y una biblioteca para enviar solicitudes HTTP (buscar)
const express = require('express');
const fetch = require('node-fetch');
// Creando instancias de servidor
const app = express();
const PORT = process.env.PORT || 3003;
// Estos metadatos se utilizan para cada solicitud, por lo que podemos definirlos una vez como una constante.
const fetchData = {
    method: "POST",
    headers: {
        "Content-Type":"application/json"
    }
}
/*
Diciendole a express que use su middleware estático y JSON.
Si el servidor recibe JSON en el cuerpo de una solicitud, convertirá automáticamente el JSON en un objeto JavaScript.
Dado que el servidor también aloja la interfaz de nuestra aplicación, tenemos que permitir que los archivos .css y .js
se puede acceder desde el servidor desde un directorio estático.
*/
app.use('/static', express.static(__dirname + '/public'));
app.use(express.json());

/*
 Configurando las rutas REST para el servidor.
 Express proporciona funciones para agregar rutas. app.get () escuchará las solicitudes GET, app.post () las solicitudes POST.
 Estas funciones requieren que se escuche la parte de la URL y que se ejecute una función de devolución de llamada cuando algo llega a esta URL.
 La función de devolución de llamada para ejecutar recibe la solicitud (req) y un objeto JavaScript que contiene múltiples funciones de respuesta (res) de express.
 Al final de nuestra devolución de llamada, usamos las funciones de respuesta para cumplir con una solicitud.
*/

/* 
Proporcionando el frontend.
Si se realiza una solicitud a las rutas URL especificadas, el servidor envía los archivos HTML correspondientes.
*/

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/customers', (req, res) => {
    res.sendFile(__dirname + '/public/pages/customers/customers.html')
})

app.get('/books', (req, res) => {
    res.sendFile(__dirname + '/public/pages/books/books.html')
});

app.get('/lends', (req, res) => {
    res.sendFile(__dirname + '/public/pages/lends/lends.html')
});

/*
Rutas POST para la solicitud enviada desde la interfaz.
La puerta de enlace API simplemente envía todas las solicitudes POST que recibe a la API de microservicio correcta utilizando la biblioteca de recuperación.
fetch devuelve una promesa. Una promesa es la forma de JavaScripts de manejar operaciones asincrónicas.
Resolverá o rechazará y llamará a la devolución de llamada correspondiente (luego o captura).
Los datos obtenidos se envían como respuesta para cumplir con la solicitud.
*/

/* API de cliente */

app.post('/customer/add', (req, res) => {
    fetch('http://customer-service:3000/add', {...fetchData, body: JSON.stringify(req.body)})
        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err));
});

app.post('/customer/update', (req, res) => {
    fetch('http://customer-service:3000/update', {...fetchData, body: JSON.stringify(req.body)})
        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err));
});

app.post('/customer/delete', (req, res) => {
    fetch('http://customer-service:3000/delete', {...fetchData, body: JSON.stringify(req.body)})
        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err));
});

app.post('/customer/getAll', (req, res) => {
    fetch('http://customer-service:3000/getAll', {...fetchData, body: JSON.stringify(req.body)})
        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err));
});

app.post('/customer/getId', (req, res) => {
    fetch('http://customer-service:3000/getId', {...fetchData, body: JSON.stringify(req.body)})
        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err));
});

/* API de libro */

app.post('/book/add', (req, res) => {
    fetch('http://book-service:3001/add', {...fetchData, body: JSON.stringify(req.body)})
        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err));
});

app.post('/book/update', (req, res) => {
    fetch('http://book-service:3001/update', {...fetchData, body: JSON.stringify(req.body)})
        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err));
});

app.post('/book/delete', (req, res) => {
    fetch('http://book-service:3001/delete', {...fetchData, body: JSON.stringify(req.body)})
        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err));
});

app.post('/book/getAll', (req, res) => {
    fetch('http://book-service:3001/getAll', {...fetchData, body: JSON.stringify(req.body)})
        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err));
});

app.post('/book/getId', (req, res) => {
    fetch('http://book-service:3001/getId', {...fetchData, body: JSON.stringify(req.body)})
        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err));
});

app.post('/book/setAvailable', (req, res) => {
    fetch('http://book-service:3001/setAvailable', {...fetchData, body: JSON.stringify(req.body)})
        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err));
});

/* API de préstamos*/

app.post('/lend/add', (req, res) => {
    fetch('http://lend-service:3002/add', {...fetchData, body: JSON.stringify(req.body)})
        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err));
});

app.post('/lend/update', (req, res) => {
    fetch('http://lend-service:3002/update', {...fetchData, body: JSON.stringify(req.body)})
        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err));
});

app.post('/lend/delete', (req, res) => {
    fetch('http://lend-service:3002/delete', {...fetchData, body: JSON.stringify(req.body)})
        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err));
});

app.post('/lend/return', (req, res) => {
    fetch('http://lend-service:3002/return', {...fetchData, body: JSON.stringify(req.body)})
        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err));
})

app.post('/lend/getAll', (req, res) => {
    fetch('http://lend-service:3002/getAll', {...fetchData, body: JSON.stringify(req.body)})
        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err));
});

app.post('/lend/getId', (req, res) => {
    fetch('http://lend-service:3002/getId', {...fetchData, body: JSON.stringify(req.body)})
        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err));
})

app.post('/lend/getByBook', (req, res) => {
    fetch('http://lend-service:3002/getByBook', {...fetchData, body: JSON.stringify(req.body)})
        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err));
})

app.post('/lend/getByCustomer', (req, res) => {
    fetch('http://lend-service:3002/getByCustomer', {...fetchData, body: JSON.stringify(req.body)})
        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err));
})

// Dígale a express que escuche la comunicación en el puerto especificado una vez realizada la configuración.
app.listen(PORT, () => console.log(`Api Gateway listening on ${PORT}`));
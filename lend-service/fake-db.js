/*
Una colección de funciones que simulan un almacenamiento de datos.
*/

// Importando una biblioteca para crear identificadores.
let uuid = require('uuid/v1');
let lends = [];

const addLend = lend => {
    const id = uuid();
    // El operador de propagación (...) se utiliza para crear un nuevo objeto que contiene todos los elementos del objeto de préstamo recibido
    // y agrega nuevas claves o cambia las claves del objeto.
    // Aquí la identificación se agrega al préstamo y se agrega una clave de tarifas al objeto del cliente.
    let newlend = {...lend, id: id, customer: {...lend.customer, fees: 0}};
    lends.push(newlend);
    return newlend;
} 

const updateLend = lend => {
   // Encuentra el índice donde la función de condición devuelve verdadero
    const index = lends.findIndex(element => element.id === lend.id);
    lends[index] = lend;
    return lends[index];
}

const removeLend = id => {
    // Encuentra el primer elemento para el que la función de condición devuelve verdadero
    const lendToRemove = lends.find(lend => lend.id === id);
    // Crea una nueva matriz que contiene todos los elementos para los que la función de condición devuelve verdadero (elimina el elemento)
    lends = lends.filter(lend => lend.id !== id);
    return lendToRemove;
}

const returnBook = (lendId, bookId) => {
    let manipLend = lends.find(lend => lendId === lend.id);
    manipLend.books = manipLend.books.filter(book => {
        if (bookId === book.id) {
            // Si el libro se devolvió tarde, debemos agregarlo a los cargos por demora
            if (book.returndate < Date.now()) {
                manipLend.customer.fees += 2;
            }
            return false;
        }
        return true;
    })
    return manipLend;
}

const getAllLends = () => {
    return lends;
}

const getLendById = id => {
    return lends.find(lend => lend.id === id);
}

const getLendByBook = bookId => {
    return lends.find(lend => {
        const book = lend.books.find(book => bookId === book.id);
        if (book !== undefined) {
            return true;
        }
        return false;
    });
}

const getLendByCustomer = customerId => {
    return lends.find(lend => lend.customer.id === customerId);
}

// Si se importa este archivo, se crea una instancia de este archivo
// y las funciones especificadas a continuación están disponibles para la parte importadora.
module.exports = {
    addLend,
    updateLend,
    removeLend,
    returnBook,
    getAllLends,
    getLendById,
    getLendByBook,
    getLendByCustomer
}
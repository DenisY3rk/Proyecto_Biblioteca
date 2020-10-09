/*
Una colección de funciones que simulan un almacenamiento de datos.
*/

// Importe una biblioteca para crear identificadores.
let uuid = require('uuid/v1');
let books = [];


// Crea algunos datos simulados
books.push({
    id: uuid(),
    isbn: "978-8494933189",
    title: "La convulsión robótica",
    author: "Richar Baldwin",
    publisher: "Antoni Bosch",
    year: 2017,
    genre: "Ingeniería",
    condition: "Español",
    available: true
},
{
    id: uuid(),
    isbn: "978-8484274261",
    title: "Método y razón práctica en la ética biomédica",
    author: "Daniel Kahneman",
    publisher: "Ediciones de la Universidad de Castilla - La Mancha",
    year: 2018,
    genre: "Biomedica",
    condition: "Español",
    available: true
});

const addBook = book => {
    const id = uuid();
    // El operador de propagación (...) se utiliza para crear un nuevo objeto que contiene todos los elementos del objeto de préstamo recibido
    // y agrega nuevas claves o cambia las claves del objeto.
    // Aquí, la identificación se agrega al objeto del libro antes de que se inserte en la matriz.
    let newBook = { ...book,
        id: id
    }
    books.push(newBook);
    return newBook;
}

const updateBook = book => {
    // Encuentra el índice donde la función de condición devuelve verdadero
    const index = books.findIndex(element => element.id === book.id);
    books[index] = book;
    return books[index];
}

const removeBook = id => {
    // Encuentra el primer elemento para el que la función de condición devuelve verdadero
    const bookToRemove = books.find(book => book.id === id);
    // Crea una nueva matriz que contiene todos los elementos para los que la función de condición devuelve verdadero (elimina el elemento)
    books = books.filter(book => book.id !== id);
    return bookToRemove;
}

const getAllBooks = () => {
    return books;
}

const getBookById = id => {
    return books.find(book => book.id === id);
}

const setAvailable = (id) => {
    const index = books.findIndex(book => book.id === id);
    books[index] = {...books[index], available: !books[index].available};
    return books[index];
}

// Si este archivo se importa, se crea una instancia de este archivo
// y las funciones especificadas a continuación están disponibles para la parte importadora.
module.exports = {
    addBook,
    updateBook,
    removeBook,
    getAllBooks,
    getBookById,
    setAvailable
}
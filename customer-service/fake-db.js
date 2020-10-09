/*
Una colección de funciones que simulan un almacenamiento de datos.
*/

// Importando una biblioteca para crear identificadores.
let uuid = require('uuid/v1');
let customers = [];

// Creando algunos datos simulados
customers.push({
    id: uuid(),
    firstname: "Eric",
    lastname: "Cardenas Figueroa",
    address: "164512",
    birthday: new Date(2020, 9, 15).toLocaleDateString()
},    
{
    id: uuid(),
    firstname: "David",
    lastname: "Chambilla Apaza",
    address: "162165",
    birthday: new Date(2020, 9, 21).toLocaleDateString()
}
);

const addCustomer = (customer) => {
    const id = uuid();
    // El operador de propagación (...) se utiliza para crear un nuevo objeto que contiene todos los elementos del objeto de préstamo recibido.
    // y agrega nuevas claves o cambia las claves del objeto.
    // Aquí, la identificación se agrega al objeto del libro antes de que se inserte en la matriz.
    let newCustomer = {...customer, id: id}
    customers.push(newCustomer);
    return newCustomer;
} 

const updateCustomer = (customer) => {
    // Encuentra el índice donde la función de condición devuelve verdadero
    const index = customers.findIndex(element => element.id === customer.id);
    customers[index] = customer;
    return customers[index];
}

const removeCustomer = id => {
    // Encuentra el primer elemento para el que la función de condición devuelve verdadero
    const customerToRemove = customers.find(customer => customer.id === id);
    // Crea una nueva matriz que contiene todos los elementos para los que la función de condición devuelve verdadero (elimina el elemento)
    customers = customers.filter(customer => customer.id !== id);
    return customerToRemove;
}

const getAllCustomers = () => {
    return customers;
}

const getCustomerById = id => {
    return customers.find(customer => customer.id === id);
}

// Si este archivo se importa, se crea una instancia de este archivo
// y las funciones especificadas a continuación están disponibles para la parte importadora.
module.exports = {
    addCustomer,
    updateCustomer,
    removeCustomer,
    getAllCustomers,
    getCustomerById
}
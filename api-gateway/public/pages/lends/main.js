var lends = [];
var books = [];
var customers = [];

var lendToCreate = {
    customer: {},
    books: []
}

function returnBooks(data) {
    fetch(`http://${window.location.host}/lend/return`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(json => {
            console.log(json)
            newLend = json;
            var replaceIndex = lends.findIndex(lend => lend.id === newLend.id);
            if (newLend.books.length > 0 ) {
                lends[replaceIndex] = newLend;
            } else {
                lends.splice(replaceIndex, 1);
            }
            renderTable();
        })
        .catch(err => console.log(err));
}

function renderTable() {
    var tbody = document.getElementById("table-body");
    tbody.innerHTML = '';
    lends.forEach(lend => {
        var row = document.createElement("tr");

        var tdLenddate = document.createElement("td");
        tdLenddate.appendChild(document.createTextNode(new Date(lend.lenddate).toLocaleDateString()));
        var tdFirstname = document.createElement("td");
        tdFirstname.appendChild(document.createTextNode(lend.customer.firstname));
        var tdLastname = document.createElement("td");
        tdLastname.appendChild(document.createTextNode(lend.customer.lastname));
        

        // Este campo contiene varios libros
        var tdBooks = document.createElement("td");
        var ulBooks = document.createElement("ul");
        lend.books.forEach(book => {
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(`${book.author}: ${book.title}, hasta: ${new Date(book.returndate).toLocaleDateString()}`));
            
            // Agrega un botón de devolución a cada libro
            var button = document.createElement("button");
            button.innerText = "Devolver";
            button.addEventListener("click", e => {
                var reqObj = {lendId: lend.id, bookId: book.id};
                returnBooks(reqObj);
            });
            button.style = "margin-left: 10px;";
            li.appendChild(button);

            ulBooks.appendChild(li);
        })

        tdBooks.appendChild(ulBooks);

        row.append(tdLenddate, tdFirstname, tdLastname, tdBooks);
        tbody.appendChild(row);
    });
}

function renderCustomers() {
    var list = document.getElementById("customer-list");
    customers.forEach(customer => {
        var li = document.createElement("li");
        li.classList.add("customer-li");

        var button = document.createElement("button");
        button.classList.add("customer-add-button");
        button.innerText = "Añadir";

        button.addEventListener("click", event => {
            if (button.innerText === "Añadir") {
                if (!lendToCreate.customer.hasOwnProperty('firstname')) {
                    lendToCreate.customer = {
                        id: customer.id,
                        firstname: customer.firstname,
                        lastname: customer.lastname
                    }
                    li.classList.add("added");
                    button.innerText = "Eliminar";
                } else {
                    alert("Ya tienes seleccionado un cliente");
                }
            } else if (button.innerText === "Eliminar") {
                lendToCreate.customer = {}
                li.classList.remove("added");
                button.innerText = "Añadir";
            }
        })

        li.appendChild(document.createTextNode(`${customer.firstname} ${customer.lastname}`));
        li.appendChild(button);
        list.appendChild(li);

    })
}

function renderBooks() {
    var list = document.getElementById("book-list");
    books.forEach((book, index) => {
        var li = document.createElement("li");
        li.classList.add("book-li");

        var span = document.createElement("span");

        var input = document.createElement("input");
        input.classList.add("book-date-input");
        input.setAttribute("type", "date");

        var button = document.createElement("button");
        button.classList.add("book-add-button");
        button.innerText = "Añadir";

        button.addEventListener("click", event => {
            if (button.innerText === "Añadir") {
                if (input.valueAsDate !== null) {
                    lendToCreate.books.push({
                        id: book.id,
                        isbn: book.isbn,
                        title: book.title,
                        author: book.author,
                        returndate: input.valueAsDate.getTime()
                    })
                    li.classList.add("added");
                    button.innerText = "Eliminar";
                } else {
                    alert("Establezca una fecha de devolución.");
                }
            } else if (button.innerText === "Eliminar") {
                lendToCreate.books = lendToCreate.books.filter(element => element.id !== book.id);
                li.classList.remove("added");
                button.innerText = "Añadir";
                input.value = '';
            }
        })

        span.append(input, button);
        li.appendChild(document.createTextNode(`${book.author}, ${book.title}, ISBN: ${book.isbn}`));
        li.appendChild(span);
        list.appendChild(li);

    })
}

function fetchAllLends() {
    fetch(`http://${window.location.host}/lend/getAll`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({})
        })
        .then(res => res.json())
        .then(json => {
            console.log(json)
            lends = json;
            renderTable();
        })
        .catch(err => console.log(err));
}

function getBooks() {
    fetch(`http://${window.location.host}/book/getAll`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({})
        })
        .then(res => res.json())
        .then(json => {
            console.log(json)
            books = json;
            renderBooks();
        })
        .catch(err => console.log(err));
}

function getCustomers() {
    fetch(`http://${window.location.host}/customer/getAll`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({})
        })
        .then(res => res.json())
        .then(json => {
            console.log(json)
            customers = json;
            renderCustomers();
        })
        .catch(err => console.log(err));
}

document.getElementById("create-button").addEventListener("click", event => {
    if (lendToCreate.customer.hasOwnProperty('firstname') && lendToCreate.books.length > 0) {
        lendToCreate['lenddate'] = Date.now();
        fetch(`http://${window.location.host}/lend/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(lendToCreate)
        })
        .then(res => res.json())
        .then(json => {
            console.log(json);
            lends.push(json);
            
            // Restablece la pantalla y los elemento
            var elements = document.querySelectorAll(".added");
            elements.forEach(element => {
                element.classList.remove("added"); 
                if (element.className === "book-li"){
                    var span = element.getElementsByTagName("span")[0];
                    span.firstElementChild.value = '';
                    span.lastElementChild.innerText = "Añadir";
                } else if (element.className === "customer-li") {
                    element.getElementsByTagName("button")[0].innerText = "Añadir";
                }
            });
            lendToCreate = {
                customer: {},
                books: []
            };
            renderTable();
        })
        .catch(err => console.log(err));
    } else {
        alert("Agregue un cliente y al menos un libro.")
    }
});


fetchAllLends();
getBooks();
getCustomers();
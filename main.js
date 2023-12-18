//https://partiel-b1dev.imatrythis.com/api

let token = ""
const content = document.querySelector(".content")
let nameCompte = "Compte"


//<----------------------------FETCH----------------------->



async function login() {
    let username = document.querySelector('#username')
    let password = document.querySelector('#password')

    let body = {
        username: username.value,
        password: password.value
    }
    let params = {
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(body),
        method: "POST"
    }
    return await fetch("https://partiel-b1dev.imatrythis.com/api/login", params)
        .then(response => response.json())
        .then(data => {
            if (data.message == "Invalid JWT Token" | "JWT Token not found") {
                renderLoginForm()
            } else {
                token = data.token
                nameCompte = username.value
                run()
            }
        })
}

//<----------------------------FRONT----------------------->

function renderLoginForm() {
    let loginTemplate = `
    <div class="row d-flex justify-content-end">
    <input class="col-auto" type="text" placeholder="username" id="username">
    <input class="col-auto" type="password" placeholder="password" id="password">
    <hr>
    <button type="button" class="btn col-3" id="loginButton">LogIn</button>
</div>`
    render(loginTemplate)
    const loginButton = document.querySelector("#loginButton")
    loginButton.addEventListener("click", () => {
        login()
    })
}

function generateListe(tableauListe) {
        let productTemplate = `<div class="form-control my-2 px-4 d-flex justify-content-between">
                <div class="divProduct${product.id}">
                    <h5>${product.name}</h5>
                    <h6>${product.description}</h6>
                    <h6>status: ${product.status}</h6>
                </div>
                <div>
                    <button class="btn btn-primary buttonDeleteProduct" id="${product.id}">DELETE</button>
                    <button class="btn btn-primary buttonSwitchStatusProduct" id="${product.id}">Swicth status</button>
                    <button class="btn btn-secondary buttonEditProduct" id="${product.id}">EDIT</button>
                </div>
            </div>`
        return productTemplate
}

function generateListeForm() {
    let messageFormTemplate = `<div class="form-control">
          <input class="form-control" type="text" name="" id="postNameListe" placeholder="name">
          <input class="form-control" type="text" name="" id="postDescriptionListe" placeholder="descritpion">
          <button class="btn btn-success form-control" id="postListeButton">Envoyer</button>
        </div>`
    return messageFormTemplate
}

function renderListe(tableauListe) {
    let contentListe = ""
    tableauListe.forEach(product => {
        contentListe += generateListe(liste)
    })
    let listeAndListeForm = contentListe + generateListeForm()
    render(listeAndListeForm)
    const postNameListe = document.querySelector("#postNameListe")
    const postDescriptionListe = document.querySelector("#postDescriptionListe")
    const postListeButton = document.querySelector("#postListeButton")

    const formulaire = postNameListe + postDescriptionListe

    postListeButton.addEventListener("click", () => {
        sendListe(formulaire.value)
    })
}

async function sendListe(listeToSend) {
    let body = {
        name: productName.value,
        description: productDescription.value
    }
    let params = {
        headers: {"Content-type": "application/json", "Authorization": `Bearer ${token}`},
        body: JSON.stringify(body),
        method: "POST"
    }
    return await fetch("https://partiel-b1dev.imatrythis.com/api/mylist/new", params)
        .then(response => response.json())
        .then(data => {
            if (data.message == "Invalid JWT Token" | "Invalid credentials.") {
                renderLoginForm()
            } else {
                if (data == "OK") {
                    run()
                } else {
                    alert("menteur")
                    run()
                }
            }
        })
}
async function fetchListe() {
    let params = {
        headers: {"Content-type": "application.json", "Authorization": `Bearer ${token}`},
        body: JSON.stringify(),
        method: "GET"
    }
    return await fetch("https://partiel-b1dev.imatrythis.com/api/mylist", params)
        .then(response => response.json)
        .then(data => {
                if (data.message == "Invalid JWT Token" | "JWT Token not found") {
                    renderLoginForm()
                } else {
                    return data
                }
            }
        )
}

//<----------------------------RUN----------------------->
function render(pageContent) {
    content.innerHTML = ""
    content.innerHTML = pageContent
}

function run() {
    if (!token) {
        renderLoginForm()
    } else {
        fetchListe().then(liste => {
            renderListe(liste)
        })
    }
}


run()
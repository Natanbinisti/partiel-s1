//https://partiel-b1dev.imatrythis.com/api

let token = ""
const content = document.querySelector(".content")
let nameCompte = "Compte"

function run() {
    if (!token) {
        renderLoginForm()
    } else {
        fetchListe().then((liste)=>{
            renderListe(liste)
        })
    }
}
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
                nameCompte = document.querySelector(".nameCompte")
                token = data.token
                nameCompte = username.value
            }
        })
}

function renderLoginForm() {
    let loginTemplate = `
<nav class="navbar bg-body-tertiary">
    <div class="container-fluid">
        <span class="navbar-brand mb-0 h1 ">${nameCompte}</span>
    </div>
</nav>
    <div class="d-flex justify-content-end">
        <input class="col-auto" type="text" placeholder="username" id="username">
        <input class="col-auto" type="password" placeholder="password" id="password">
        <hr>
        <button type="button" class="btn btn-secondary col-3" id="loginButton">LogIn</button>
    </div>`
    render(loginTemplate)
    const loginButton = document.querySelector("#loginButton")
    loginButton.addEventListener("click", () => {
        login().then(()=>{
            run()
        })
    })
}



async function fetchListe() {
    let params = {
        headers: {"Content-type": "application.json", "Authorization": `Bearer ${token}`},
        method: "GET"
    }
    return await fetch("https://partiel-b1dev.imatrythis.com/api/mylist", params)
        .then(response => response.json())
        .then(data => {
                if (data.message == "Invalid JWT Token" | "JWT Token not found") {
                    renderLoginForm()
                } else {
                    return data
                }
            }
        )
}
function renderListe(tableauListe) {
    let contentListe = ""
    tableauListe.forEach(product => {
        contentListe += `
        <div class="form-control my-2 px-4 d-flex justify-content-between">
                <div class="divProduct${product.id}">
                    <h5>${product.name}</h5>
                    <h6>${product.description}</h6>
                    <h6>status: ${product.status}</h6>
                </div>
       
        </div>`

    })
    let listeAndListeGenerate = contentListe + generateListeForm()
    render(listeAndListeGenerate)

    const postListeButton = document.querySelector("#postListeButton")
    const postNameListe = document.querySelector("#postNameListe")
    const postDescriptionListe = document.querySelector("#postDescriptionListe")

    postListeButton.addEventListener("click",() => {
        sendListe(postNameListe.value,postDescriptionListe.value).then((data) => {
            run()
        })
    })

}


function generateListeForm() {
    let messageFormTemplate = `<div class="form-control">
          <input class="form-control" type="text" name="" id="postNameListe" placeholder="name">
          <input class="form-control" type="text" name="" id="postDescriptionListe" placeholder="descritpion">
          <button class="btn btn-success form-control" id="postListeButton">Envoyer</button>
        </div>`
    return messageFormTemplate
}

async function sendListe(listeName,listeDescription) {
    let body = {
        name: listeName,
        description: listeDescription
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
                return data
            }
        })
}

function render(pageContent) {
    content.innerHTML = ""
    content.innerHTML = pageContent
}




run()
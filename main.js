let token = ""
const content = document.querySelector(".content")
let nameCompte = "Compte"

function render(pageContent) {
    content.innerHTML = ""
    content.innerHTML = pageContent
}
function login() {
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
    fetch("https://partiel-b1dev.imatrythis.com/api/login", params)
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

function generateListe(liste) {
    let produit = `<div class="card">
  <div class="card-body">
    <h5 class="card-title">${nameCompte}</h5>
    <p class="card-text">With  text below as a natural lead-in to additional content.</p>
    <a href="#" class="btn btn-primary" id="postListeButton">Go somewhere</a>
  </div>
</div>`
    return produit
}
function afficherListe(tableauListe) {
    let contentListe = ""

    let listeAndListeForm =contentListe +generateListe() +generateListeForm()
    render(listeAndListeForm)
    const postNameliste = document.querySelector("#postNameliste")
    const postDescriptionliste = document.querySelector("#postDescriptionliste")
    const postListeButton = document.querySelector("#postListeButton")

    postListeButton.addEventListener("click", () => {
        ajouterListe(postNameliste.value +postDescriptionliste)
    })
}
async function fetchListe() {
    let params = {
        headers: {"Content-type": "application.json", "Authorization": `Bearer ${token}`},
        method: "GET"
    }
    return await fetch(" https://partiel-b1dev.imatrythis.com/api/mylist", params)
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
function sendListe(listeToSend){
    let body = {
        content: listeToSend
    }
    let params = {
        headers: {"Content-type": "application/json", "Authorization": `Bearer ${token}`},
        body: JSON.stringify(body),
        method: "POST"
    }
    fetch("https://partiel-b1dev.imatrythis.com/api/mylist/new", params)
        .then(response=> response.json())
        .then(data=>{
            if (data.message == "Invalid JWT Token"  | "Invalid credentials."){
                renderLoginForm()
            } else {
                if (data == "OK"){
                    run()
                }else {
                    alert("tu te fou de moi")
                    run()}
            }
        })
}
function run() {
    if (!token) {
        renderLoginForm()
    } else {
        fetchListe().then(liste=> {
            afficherListe(liste)
        })
    }
}
function generateListeForm() {
    let messageFormTemplate = `<div class="form-control">
          <input class="form-control" type="text" name="" id="postNameListe" placeholder="name">
          <input class="form-control" type="text" name="" id="postDescriptionListe" placeholder="descritpion">
          <button class="btn btn-success form-control" id="postListeButton">Envoyer</button>
        </div>`
    return messageFormTemplate}

run()
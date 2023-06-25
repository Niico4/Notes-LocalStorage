//! Variables
const formulario = document.querySelector('#formulario');
const listTweets = document.querySelector('#lista-tweets');
let tweets = [];


//! Eventos
eventListeners();

function eventListeners() {
    //* Cuando se agrega nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    //* Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];

        crearHTML();
    });
}



//! Funciones
function agregarTweet(e) {
    e.preventDefault();

    //* Textarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;
    
    //* Validacion
    if (tweet === '') {
        mostrarError('Un Mensaje no puede ir vacio')
        return;
    }

    const tweetObj = {
        id: Date.now(),
        tweet
    }

    //* Añadir al arreglo tweets
    tweets = [...tweets, tweetObj];

    //* Crear el HTML
    crearHTML();

    //* Reiniciar el Formulario
    formulario.reset();

}

//? Mostrar Mensaje de Error
function mostrarError(error) {
    const mensajeError = document.createElement('P');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');
    
    //* Insertar en HTML
    const contenido = document.querySelector('#contenido')
    contenido.appendChild(mensajeError);

    //* Elimina alerta despues de 3s
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

//? Muestra un listado de los tweets
function crearHTML() {
    limpiarHTML()

    if (tweets.length > 0) {
        tweets.forEach(tweet => {
            //* Agregar boton eliminar
            const btnEliminar = document.createElement('A');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = "X"

            //* Añadir Funcion eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            //* Crear HTML
            const li = document.createElement('LI');

            //* Añadir Texto
            li.innerText = tweet.tweet;

            //* Asignar Boton
            li.appendChild(btnEliminar);
            
            //* Insertar en HTML
            listTweets.appendChild(li);
        });
    }

    sincronizarStorage();
}

//? Agrega Tweets actuales a LocalStorage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

//? Elimina un Tweet
function borrarTweet(id) {
    tweets = tweets.filter(tweet => tweet.id !== id);

    crearHTML();
}

//? Limpiar HTML
function limpiarHTML() {
    while (listTweets.firstChild) {
        listTweets.removeChild(listTweets.firstChild);
    }
}
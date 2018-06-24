window.addEventListener('load', home);

function home() {} // agregar cuadros ranking aqui


//busqueda
let inputText = document.getElementById("InputSearch");
inputText.addEventListener("keypress", (event) => {
    let key = event.which || event.keyCode;
    if (key === 13) {
        let name = inputText.value;
        let perfil = window.filterUsers(userStats, name);
        imprimirLista(perfil)
        inputText.value = "";
    }
})

function imprimirLista(usersList) {
    let lista = document.querySelector("#display")
    lista.innerHTML = "";
    usersList.forEach((userStats) => {
        let listaConStats = `<tr>
        <td class="name">${userStats.name}</td>
        <td class="percent">${userStats.stats.percent}</td>
        <td class="exercisesCompleted">${userStats.stats.exercises.completed}</td>
        <td class="quizzesCompleted">${userStats.stats.quizzes.completed}</td>
        <td class="quizzesScoreAvg">${userStats.stats.quizzes.scoreAvg}</td>
        <td class="readsCompleted">${userStats.stats.reads.completed}</td>
        </tr>`
        lista.innerHTML += listaConStats
    })
}

//Menu
let botonCohort = document.getElementById("btn")
botonCohort.addEventListener("click", (event) => {
    imprimirLista(userStats);
})

//otros botones

let butName = document.getElementById("nameord") //falta ver como ordenar
butName.addEventListener("click", (event) => {
    imprimirLista(userStats);
})
let butAve = document.getElementById("aveord") //falta ver como ordenar
butCohort.addEventListener("click", (event) => {
    imprimirLista(userStats);
})

//grafica
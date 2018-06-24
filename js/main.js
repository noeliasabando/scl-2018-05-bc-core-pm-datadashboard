function unhide() {
    let show = document.getElementById("studentlist");
    show.style.display = "block";
    let hide = document.getElementById("bienvenida");
    hide.style.display = "none";
    imprimirLista(userStats);
}


//Busqueda
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
        <td class="exercisesCompleted">${userStats.stats.exercises.completed} de ${userStats.stats.exercises.total}</td>
        <td class="quizzesCompleted">${userStats.stats.quizzes.completed}</td>
        <td class="quizzesScoreAvg">${userStats.stats.quizzes.scoreAvg}</td>
        <td class="readsCompleted">${userStats.stats.reads.completed}</td>
        </tr>`
        lista.innerHTML += listaConStats
    })
}


//Menu
//let botonCohort = document.getElementById("btn")
//botonCohort.addEventListener("click", (event) => {
//    imprimirLista(userStats);
//})

//otros botones


function seleccion() {
    if (document.getElementById("nameord").selected == true) {
        let nombreOrdenado = window.sortUsers(userStats, "name", "ASC")
        imprimirLista(nombreOrdenado);
        console.log("0");
    }
    if (document.getElementById("aveord").selected == true) {
        let avanceGral = window.sortUsers(userStats, "percent", "ASC")
        imprimirLista(avanceGral);
        console.log("1");
    } else if (document.getElementById("btnejerCom").selected == true) {
        let ejerciciosOrdenados = window.sortUsers(userStats, "exercises percent", "ASC")
        imprimirLista(ejerciciosOrdenados);
        console.log(" 2");

    } else if (document.getElementById("btnquizzes").selected == true) {
        let promPtosQuizzes = window.sortUsers(userStats, "quizzes scoreAvg", "ASC")
        imprimirLista(promPtosQuizzes);
        console.log(" 3");
    }
}
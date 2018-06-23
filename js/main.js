//tabla por defecto
window.onload = (
    function loadtable(event) {
        let cohortSignup = "lim-2018-03-pre-core-pw"; //aqui poner el nombre el cohort
        let cohort = window.filterUsers(userStats, cohortSignup);
        imprimirLista(cohort)
    })

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
    let cohortsname = "lim-2018-03-pre-core-pw"; //aqui poner el nombre el cohort
    let lim = window.filterUsers(userStats, cohortsname);
    imprimirLista(lim)

})
let botonCohort= document.getElementById("btn")
botonCohort.addEventListener("click", (event)=>{
    imprimirLista(userStats)
})



let inputText=document.getElementById("InputSearch");
inputText.addEventListener("keypress", (event) =>{
    let key= event.which || event.keyCode;
    if(key===13){
        let name= inputText.value; 
        let perfil= window.filterUsers(userStats, name);
        imprimirLista(perfil)
        inputText.value= "";     
    }
}) 

function imprimirLista(usersList){
    console.log(userStats)
    let lista= document.getElementById("display")
    lista.innerHTML= ""
    usersList.forEach((userStats)=>{
        let listaConStats= `<div class='fila'>
        <div class="name">${userStats.name}</div>
        <div class="percent">${userStats.stats.percent}</div>
        <div class="exercisesCompleted">${userStats.stats.exercises.completed}</div>
        <div class="quizzesCompleted">${userStats.stats.quizzes.completed}</div>
        <div class="quizzesScoreAvg">${userStats.stats.quizzes.scoreAvg}</div>
        <div class="readsCompleted">${userStats.stats.reads.completed}</div>
        </div>`        
        lista.innerHTML +=listaConStats             
    })
}



   
    
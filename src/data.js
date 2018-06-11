const users = new XMLHttpRequest();
users.open("GET", "./data/cohorts/users.json", true);
const progress = new XMLHttpRequest();
users.open("GET", "./data/cohorts/progress.json", true);
const courses = ["intro"];

window.computeUsersStats = (users, progress, courses) => {
    //debugger
    let lista = users.map(
        (user) => {
            user.stats = {
                percent: promedioCursos(progress[user.id], courses),
                exercises: {
                    total: totalExcercises(progress[user.id], courses),
                    completed: true,
                    percent: true,
                },
                reads: true,
                quizzes: true,
            }
            return user
        }
    )
    return lista
}

function promedioCursos(progress, courses) {
    let contador = 0;
    courses.forEach(curso => {
        contador += progress[curso].percent;
    });
    return contador / courses.length;
}

function totalExcercises(progress, courses) {
    let total = 0;
    courses.forEach(curso => {
        Object.values(progress[curso].units).forEach(unit => {
            let partes = Object.values(unit.parts).filter(ejercicio => ejercicio.hasOwnProperty("exercises"));
            partes.forEach((parte) => {
                total += Object.values(parte.exercises).length;
            })
        })
    })
    return total;
}

var richUsersData = window.computeUsersStats(users, progress, courses)


console.log(richUsersData)


Object.values(cohorts)
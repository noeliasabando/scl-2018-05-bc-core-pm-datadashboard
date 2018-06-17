/*const users = require('users');
const dataUsers = users.readFileSync("./data/cohorts/lim-2018-03-pre-core-pw/users.json", "utf8").toString();
const progress = require('progress');
const dataProgress = users.readFileSync("./data/cohorts/lim-2018-03-pre-core-pw/progress.json", "utf8").toString();
*/

function getUsers() {
    const users = new XMLHttpRequest();
    users.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const dataUsers = JSON.parse(this.responseText);
            for (i = 0; i < users.length[i]; i++) {

            }
        }
    }
};
users.open("GET", "../data/cohorts/users.json", true);
users.send();

const progress = new XMLHttpRequest();
users.open("GET", "../data/cohorts/progress.json", true);
users.send();
const courses = ["intro"];

console.log(users);


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
            return user;
        }
    )
    return lista;
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

console.log(contents);
Object.values(cohorts);
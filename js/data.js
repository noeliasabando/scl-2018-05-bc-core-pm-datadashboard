let users = [];
let progress = [];
let courses = [];

fetch("../data/cohorts/lim-2018-03-pre-core-pw/users.json")
    .then(response => response.json())
    .catch((err) => {
        console.error(err);
    })
    .then(data => {
        users = data
    })

fetch("../data/cohorts/lim-2018-03-pre-core-pw/progress.json")
    .then(response => response.json())
    .catch((err) => {
        console.error(err);
    })
    .then(data => {
        progress = data
    })

fetch("../data/cohorts.json")
    .then(response => response.json())
    .catch((err) => {
        console.error(err);
    })
    .then(data => {
        courses = data
    })

window.computeUsersStats = (users, progress, courses) => {

    let lista = users.map(
        (user) => {
            user.stats = {
                percent: promedioCursos(progress[user.id], courses),
                exercises: {
                    total: totalExcercises(progress[user.id], courses),
                    completed: completeExcercise(progress[user.id], courses),
                    percent: (completeExcercise(progress[user.id], courses) / totalExcercises(progress[user.id], courses)) * 100, //puedo parsear una funcion?????
                },
                reads: {
                    total: totalReads(progress[user.id], courses),
                    completed: completedReads(progress[user.id], courses),
                    percent: (completedReads(progress[user.id], courses) / totalReads(progress[user.id], courses)) * 100,
                },
                quizzes: {
                    total: totalQuizzes(progress[user.id], courses),
                    completed: completeQuizzes(progress[user.id], courses),
                    percent: (completeQuizzes(progress[user.id], courses) / totalQuizzes(progress[user.id], courses)) * 100,
                    scoreSum: scoreSum(progress[user.id], courses),
                    scoreAvg: (scoreSum(progress[user.id], courses) / completeQuizzes(progress[user.id], courses)),
                }
            }
            return user
        }
    )
    return lista
}

//1) computeUsersStats(users, progress, courses)

function promedioCursos(progress, courses) {
    let contador = 0;
    courses.forEach(curso => {
        contador += progress[curso].percent;
    });
    return contador / courses.length;
}

//funciones ejercicios, total por curso, completados por alumna 
function totalExcercises(progress, courses) {
    let total = 0;
    courses.forEach(curso => {
        Object.values(progress[curso].units).forEach(unit => {
            let exercises = Object.values(unit.parts).filter(ejercicio => ejercicio.hasOwnProperty("exercises"));
            exercises.forEach((parte) => {
                total += Object.values(parte.exercises).length;
            })
        })
    })
    return total;
}

function completeExcercise(progress, courses) {
    let total = 0;
    courses.forEach(curso => {
        Object.values(progress[curso].units).forEach(unit => {
            let partes = Object.values(unit.parts).filter(ejercicio => ejercicio.hasOwnProperty("exercises"));
            partes.forEach((parte) => {
                let completeExercices = Object.values(parte.exercises).filter(
                    (exercise) => {
                        return exercise.completado === 1;
                    })
                total += completeExercices.length;
            })
        })
    })
    return total;
}

function totalReads(progress, courses) {
    let total = 0;
    courses.forEach(curso => {
        Object.values(progress[curso].units).forEach(unit => {
            let reads = Object.values(unit.parts).filter(lectura => lectura.hasOwnProperty("type") && lectura.type === "read"); //al no poner llaves se retorna automaticamente la primera linea
            total += reads.length
        })
    })
    return total;
}

function completedReads(progress, courses) {
    let total = 0;
    courses.forEach(curso => {
        Object.values(progress[curso].units).forEach(unit => {
            let lecturas = Object.values(unit.parts).filter(lectura => lectura.type === "read");
            let onlyReads = lecturas.filter((lectura) => lectura.completed === 1)
            total += onlyReads.length;
        })
    })
    return total;
}

function totalQuizzes(progress, courses) {
    let total = 0;
    Object.entries(progress).forEach(([nombre, curso]) => {
        if (courses.indexOf(nombre) >= 0) {
            Object.values(curso.units).forEach((unit) => {
                let quiz = Object.values(unit.parts).filter((part) => part.type === "quiz")
                total += quiz.length;
            })
        }
    })
    return total;
}

function completeQuizzes(progress, courses) {
    let total = 0;
    courses.forEach(curso => {
        Object.values(progress[curso].units).forEach(unit => {
            let quizzes = Object.values(unit.parts).filter(quiz => quiz.type === "quiz");
            let onlyQuizzes = quizzes.filter((quiz) => quiz.completed === 1)
            total += onlyQuizzes.length;
        })
    })
    return total;
}

//Suma de todas las puntuaciones (score) de los quizzes completados.
function scoreSum(progress, courses) {
    let total = 0;
    courses.forEach(curso => {
        Object.values(progress[curso].units).forEach(unit => {
            let quizzes = Object.values(unit.parts).filter((part) => part.type === "quiz" && part.completed === 1)
            quizzes.forEach(quiz => {
                total += quiz.score
            })
        })
    })
    return total
}

/*2) sortUsers(users, orderBy, orderDirection) ORDERBY ordenar por nombre, porcentaje de completitud total(percent),
porcentaje de ejercicios autocorregidos completados(exercises percente), porcentaje de quizzes completados(quizzes percent), 
puntuación promedio en quizzes completados(quizzes scoreavg), y porcentaje de lecturas completadas(reads percent).*/

window.sortUsers = (users, orderBy, orderDirection) => {
    let compareNames = (user1, user2) => {
        if (user1.name < user2.name) {
            return -1
        }
        if (user1.name > user2.name) {
            return 1
        } else return 0
    }
    let compareNamesDesc = (user1, user2) => -compareNames(user1, user2);

    let comparePercent = (user1, user2) => {
        if (user1.stats.percent < user2.stats.percent) {
            return -1
        }
        if (user1.stats.percent > user2.stats.percent) {
            return 1
        } else return 0
    }
    let comparePercentDesc = (user1, user2) => -comparePercent(user1, user2);

    let compareExercisesPercent = (user1, user2) => {
        if (user1.stats.exercises.percent < user2.stats.exercises.percent) {
            return -1
        }
        if (user1.stats.exercises.percent > user2.stats.exercises.percent) {
            return 1
        } else return 0
    }
    let compareExercisesPercentDesc = (user1, user2) => -compareExercisesPercent(user1, user2);

    let compareQuizzesPercent = (user1, user2) => {
        if (user1.stats.quizzes.percent < user1.stats.quizzes.percent) {
            return -1
        }
        if (user2.stats.quizzes.percent > user2.stats.quizzes.percent) {
            return 1
        } else return 0
    }
    let compareQuizzesPercentDesc = (user1, user2) => -compareQuizzesPercent(user1, user2);

    let compareQuizzesScoreAvg = (user1, user2) => {
        if (user1.stats.quizzes.scoreAvg < user2.stats.quizzes.scoreAvg) {
            return -1
        }
        if (user1.stats.quizzes.scoreAvg > user2.stats.quizzes.scoreAvg) {
            return 1
        } else return 0
    }
    let compareQuizzesScoreAvgDesc = (user1, user2) => -compareQuizzesScoreAvg(user1, user2);

    let compareReadsPercent = (user1, user2) => {
        if (user1.stats.reads.percent < user2.stats.reads.percent) {
            return -1
        }
        if (user1.stats.reads.percent > user2.stats.reads.percent) {
            return 1
        } else return 0
    }
    let compareReadsPercentDesc = (user1, user2) => -compareReadsPercent(user1, user2);


    if (orderBy === "name") {
        if (orderDirection === "ASC") {
            users.sort(compareNames)
        } else users.sort(compareNamesDesc)
    }
    if (orderBy === "percent") {
        if (orderDirection === "ASC") {
            users.sort(comparePercent)
        } else users.sort(comparePercentDesc)
    }
    if (orderBy === "exercises percent") {
        if (orderDirection === "ASC") {
            users.sort(compareExercisesPercent)
        } else user.sort(compareExercisesPercentDesc)
    }
    if (orderBy === "quizzes percent") {
        if (orderDirection === "ASC") {
            users.sort(compareQuizzesPercent)
        } else users.sort(compareQuizzesPercentDesc)
    }
    if (orderBy === "quizzes scoreAvg") {
        if (orderDirection === "ASC") {
            users.sort(compareQuizzesScoreAvg)
        } else users.sort(compareQuizzesScoreAvgDesc)
    }
    if (orderBy === "reads percent") {
        if (orderDirection === "ASC") {
            users.sort(compareReadsPercent)
        } else users.sort(compareReadsPercentDesc)
    }
    return users
}


//3) filterUsers(users, search)

window.filterUsers = (users, search) => {
    let filterName = users.filter((user) => user.name.includes(search))
    return filterName
}
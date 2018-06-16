//let json= require('/data/cohorts/users.json');

/* const users = new XMLHttpRequest();
users.open("GET", "./data/cohorts/users.json", true);
users.send();
const progress = new XMLHttpRequest();
progress.open("GET", "./data/cohorts/progress.json", true);
progress.send();
const courses = ["intro"]; */

console.log(users);


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
          scoreAvg: (scoreSum(progress[user.id], courses)/ completeQuizzes(progress[user.id], courses)) *100,
        }
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
//funciones ejercicios, total por curso, completados por alumna y FALTA porcentaje de completados por alumna
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
  let total= 0;
  courses.forEach(curso=>{
    Object.values(progress[curso].units).forEach(unit=>{
      let quizzes= Object.values(unit.parts).filter((part)=> part.type ==="quiz" && part.completed=== 1)
      quizzes.forEach(quiz=>{
        total += quiz.score
      })
    })
  })
  return total
}



var users = [
  {
    "id": "00hJv4mzvqM3D9kBy3dfxoJyFV82",
    "signupCohort": "lim-2018-03-pre-core-pw",
    "timezone": "America/Lima",
    "name": "Lizeth",
    "locale": "es-ES",
    "role": "student"
  },
  {
    "id": "04oXrfTxNUbhGtkxNTfw7fhHVgs1",
    "name": "Devora Alexandra Miñano Vejarano",
    "locale": "es-PE",
    "signupCohort": "lim-2018-03-pre-core-pw",
    "timezone": "America/Lima",
    "role": "student"
  }]
var progress =
  {
    "00hJv4mzvqM3D9kBy3dfxoJyFV82": {
      "intro": {
        "totalDuration": 465,
        "units": {
          "01-introduction": {
            "percent": 100,
            "parts": {
              "02-why-learn-to-code": {
                "duration": 20,
                "completed": 1,
                "type": "read",
                "completedAt": "2018-03-29T05:11:05.809Z"
              },
              "01-growth-mindset": {
                "type": "read",
                "completedAt": "2018-03-29T05:08:45.105Z",
                "duration": 20,
                "completed": 1
              },
              "00-welcome-and-orientation": {
                "type": "read",
                "completedAt": "2018-03-29T04:58:42.156Z",
                "duration": 10,
                "completed": 1
              },
              "04-quiz": {
                "score": 40,
                "type": "quiz",
                "completedAt": "2018-03-30T03:52:12.632Z",
                "duration": 20,
                "completed": 1
              },
              "03-your-first-website": {
                "type": "read",
                "completedAt": "2018-03-29T05:21:08.998Z",
                "duration": 20,
                "completed": 1
              }
            },
            "totalParts": 5,
            "completedParts": 5,
            "totalDuration": 90,
            "completedDuration": 90
          },
          "03-ux-design": {
            "totalParts": 4,
            "completedParts": 0,
            "totalDuration": 90,
            "completedDuration": 0,
            "percent": 0,
            "parts": {
              "00-development-team": {
                "duration": 15,
                "completed": 0,
                "type": "read"
              },
              "02-ux-design-vs-ui-design": {
                "duration": 30,
                "completed": 0,
                "type": "read"
              },
              "01-ux-design": {
                "duration": 15,
                "completed": 0,
                "type": "read"
              },
              "03-quiz": {
                "duration": 30,
                "completed": 0,
                "type": "quiz"
              }
            }
          },
          "02-variables-and-data-types": {
            "parts": {
              "03-comments": {
                "duration": 15,
                "completed": 1,
                "type": "read",
                "completedAt": "2018-03-30T04:08:51.540Z"
              },
              "06-exercises": {
                "exercises": {
                  "01-coin-convert": {
                    "completed": 0
                  },
                  "02-restaurant-bill": {
                    "completed": 0
                  }
                },
                "type": "practice",
                "duration": 30,
                "completed": 0
              },
              "00-values-data-types-and-operators": {
                "duration": 60,
                "completed": 0,
                "type": "read"
              },
              "05-quiz": {
                "score": 17,
                "type": "quiz",
                "completedAt": "2018-04-05T17:16:57.303Z",
                "duration": 30,
                "completed": 1
              },
              "04-guided-exercises": {
                "duration": 60,
                "completed": 1,
                "type": "practice",
                "completedAt": "2018-04-05T17:13:22.380Z"
              },
              "01-variables": {
                "type": "read",
                "duration": 60,
                "completed": 0
              },
              "02-self-learning-MDN": {
                "type": "read",
                "completedAt": "2018-03-30T04:17:59.539Z",
                "duration": 30,
                "completed": 1
              }
            },
            "totalParts": 7,
            "completedParts": 4,
            "totalDuration": 285,
            "completedDuration": 135,
            "percent": 58
          }
        },
        "completedUnits": 1.58,
        "completedDuration": 225,
        "totalUnits": 3,
        "percent": 53
      }
    },
    "04oXrfTxNUbhGtkxNTfw7fhHVgs1": {
      "intro": {
        "totalDuration": 465,
        "units": {
          "03-ux-design": {
            "parts": {
              "03-quiz": {
                "score": 88,
                "type": "quiz",
                "completedAt": "2018-03-23T05:53:09.391Z",
                "duration": 30,
                "completed": 1
              },
              "00-development-team": {
                "duration": 15,
                "completed": 1,
                "type": "read",
                "completedAt": "2018-03-19T07:28:17.194Z"
              },
              "02-ux-design-vs-ui-design": {
                "type": "read",
                "completedAt": "2018-03-23T05:35:32.837Z",
                "duration": 30,
                "completed": 1
              },
              "01-ux-design": {
                "duration": 15,
                "completed": 1,
                "type": "read",
                "completedAt": "2018-03-23T04:30:57.044Z"
              }
            },
            "totalParts": 4,
            "completedParts": 4,
            "totalDuration": 90,
            "completedDuration": 90,
            "percent": 100
          },
          "02-variables-and-data-types": {
            "parts": {
              "01-variables": {
                "duration": 60,
                "completed": 1,
                "type": "read",
                "completedAt": "2018-03-19T03:39:20.142Z"
              },
              "02-self-learning-MDN": {
                "type": "read",
                "completedAt": "2018-03-19T04:05:48.060Z",
                "duration": 30,
                "completed": 1
              },
              "03-comments": {
                "duration": 15,
                "completed": 1,
                "type": "read",
                "completedAt": "2018-03-19T04:51:01.964Z"
              },
              "06-exercises": {
                "duration": 30,
                "completed": 1,
                "exercises": {
                  "01-coin-convert": {
                    "completed": 1,
                    "completedAt": "2018-03-19T07:10:32.696Z"
                  },
                  "02-restaurant-bill": {
                    "completedAt": "2018-03-19T07:18:51.455Z",
                    "completed": 1
                  }
                },
                "type": "practice",
                "completedAt": "2018-03-19T07:18:51.455Z"
              },
              "00-values-data-types-and-operators": {
                "duration": 60,
                "completed": 1,
                "type": "read",
                "completedAt": "2018-03-19T00:19:55.182Z"
              },
              "05-quiz": {
                "duration": 30,
                "completed": 1,
                "score": 92,
                "type": "quiz",
                "completedAt": "2018-03-19T06:55:14.568Z"
              },
              "04-guided-exercises": {
                "type": "practice",
                "completedAt": "2018-03-19T05:18:02.961Z",
                "duration": 60,
                "completed": 1
              }
            },
            "totalParts": 7,
            "completedParts": 7,
            "totalDuration": 285,
            "completedDuration": 285,
            "percent": 100
          },
          "01-introduction": {
            "totalDuration": 90,
            "completedDuration": 90,
            "percent": 100,
            "parts": {
              "00-welcome-and-orientation": {
                "type": "read",
                "completedAt": "2018-03-18T17:02:57.677Z",
                "duration": 10,
                "completed": 1
              },
              "04-quiz": {
                "duration": 20,
                "completed": 1,
                "score": 100,
                "type": "quiz",
                "completedAt": "2018-03-18T21:40:38.851Z"
              },
              "03-your-first-website": {
                "type": "read",
                "completedAt": "2018-03-18T20:00:34.104Z",
                "duration": 20,
                "completed": 1
              },
              "02-why-learn-to-code": {
                "type": "read",
                "completedAt": "2018-03-18T19:50:10.406Z",
                "duration": 20,
                "completed": 1
              },
              "01-growth-mindset": {
                "duration": 20,
                "completed": 1,
                "type": "read",
                "completedAt": "2018-03-18T18:42:06.789Z"
              }
            },
            "totalParts": 5,
            "completedParts": 5
          }
        },
        "completedUnits": 3,
        "completedDuration": 465,
        "totalUnits": 3,
        "percent": 100
      }
    }
  };
var courses = ["intro"];

var richUsersData = window.computeUsersStats(users, progress, courses)

console.log(richUsersData)





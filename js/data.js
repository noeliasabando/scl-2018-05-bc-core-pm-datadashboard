const users = [];
const progress = [];
const courses = [];

fetch("../../data/cohorts/lim-2018-03-pre-core-pw/users.json")
    .then(json => {
        let users = JSON.stringify(json); // => la data!!
    })
    .catch((err) => {
        console.error(err);
    });


fetch("../../data/cohorts/lim-2018-03-pre-core-pw/progress.json")
    .then(json => {
        let progress = JSON.stringify(json); // => la data!!
    })
    .catch((err) => {
        console.error(err);
    });


fetch("../../data/cohorts/cohorts.json")
    .then(json => {
        let courses = JSON.stringify(json.coursesIndex);
    })
    .catch((err) => {
        console.error(err);
    });
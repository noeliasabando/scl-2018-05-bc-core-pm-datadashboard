users =
    progress =
    cohort =

    fetch("../../data/cohorts/lim-2018-03-pre-core-pw/users.json")
    .then(response => response.json())
    .then(json => {
        console.log(json); // => la data!!
    })
    .catch((err) => {
        console.error(err);
    });


fetch("../../data/cohorts/lim-2018-03-pre-core-pw/progress.json")
    .then(response => response.json())
    .then(json => {
        console.log(json); // => la data!!
    })
    .catch((err) => {
        console.error(err);
    });


fetch("../../data/cohorts/cohort.json")
    .then(response => response.json())
    .then(json => {
        console.log(json); // => la data!!
    })
    .catch((err) => {
        console.error(err);
    });
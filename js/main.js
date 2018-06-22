//Search
function searchstu() {
    // Declarar variables
    let inputSearch = document.getElementById("InputSearch");
    let filterSearch = inputSearch.value.toUpperCase();
    let ulSearch = document.getElementById("cohortUL");
    let liSearch = ulSearch.getElementsByTagName("li");

    // Loop through all list items, and hide those who dont match the search query
    for (i = 0; i < liSearch.length; i++) {
        a = liSearch[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filterSearch) > -1) {
            liSearch[i].style.display = "";
        } else {
            liSearch[i].style.display = "none";
        }
    }
}
//seleccionar cohort
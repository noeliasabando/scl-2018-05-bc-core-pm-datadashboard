//seleccionar cohort
let selectButton = document.getElementById("select");
let itemList = document.getElementById("cohort");
let outputBox = document.getElementById("output");

selectButton.addEventListener("click", function seleccionar() {
    let collection = itemList.selectedOptions;
    let output = `<h1> Estas en el Cohort: </h1>`;
    let listStu = `<br><div class="studentlist">
    <h1>Lista de Alumnas</h1>
    <ul id="cohortUL">
        <li><a href="#">Adele</a></li>
        <li><a href="#">Agnes</a></li>

        <li><a href="#">Billy</a></li>
        <li><a href="#">Bob</a></li>

        <li><a href="#">Calvin</a></li>
        <li><a href="#">Christina</a></li>
        <li><a href="#">Cindy</a></li>
    </ul>
</div>`;
    for (let i = 0; i < collection.length; i++) {
        output += collection[i].label + listStu;
    }
    outputBox.innerHTML = output;
});

//Search
function searchstu() {
    // Declarar variables
    let inputSearch = document.getElementById("InputSearch");
    let filterSearch = inputSearch.value.toUpperCase();
    let ulSearch = document.getElementById("cohortUL");
    let liSearch = ulSearch.getElementsByTagName("li");

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < liSearch.length; i++) {
        a = liSearch[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filterSearch) > -1) {
            liSearch[i].style.display = "";
        } else {
            liSearch[i].style.display = "none";
        }
    }
}



// lista de cursos
/*function coursesList(courses) {
    let domSelect = document.createElement("select");
    domSelect.multiple = true;
    document.getElementsById("selector")[0].appendChild(domSelect);
    for (i = 0; i < courses.length; i++) {
        let optionSelect = document.createElement("option");

        let optText = document.createTextNode(courses[i]);
        optionSelect.appendChild(optText);

        document.getElementsByTagName("select")[0].appendChild(optionSelect);
    }
}*/
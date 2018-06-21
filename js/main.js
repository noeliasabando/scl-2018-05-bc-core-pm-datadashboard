let selectButton = document.getElementById("select");
let itemList = document.getElementById("cohort");
let outputBox = document.getElementById("output");

selectButton.addEventListener("click", function seleccionar() {
    let collection = itemList.selectedOptions;
    let output = "<h1> Estas en el Cohort: </h1>";
    for (let i = 0; i < collection.length; i++) {
        output += collection[i].label;
    }
    outputBox.innerHTML = output;
});


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
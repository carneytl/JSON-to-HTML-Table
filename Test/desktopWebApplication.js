// Declare variables 
var apiButton = document.getElementById("buttonSearch");
var sortButtonA_Z = document.getElementById("buttonSortA_Z");
var sortButtonZ_A = document.getElementById("buttonSortZ_A");
//store ISBN-10 books here and use randomly for example.
var books = ["1285057090", "0691175756", "1473678455", "0538497815", "1938168186", "1119296692", "0321516583",
    "1842658891", "0131495089"
];

//Adding EventListener to pull from API
apiButton.addEventListener("click", function() {
    var userISBN = document.getElementById("myInputName").value;
    var randomBook = books[Math.floor(Math.random() * books.length)];
    console.log(userISBN);
    //Request variable for HTTP
    const request = new XMLHttpRequest();
    request.open("GET", "https://www.googleapis.com/books/v1/volumes?q=isbn:" + userISBN);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    //Function to prepare renderHTML(dataParse)
    request.onload = function() {
        var dataParse = JSON.parse(request.responseText);
        console.log(request.responseText);
        renderHTML(dataParse);

    };
    //Sending request; GoogleBooks API did not require a key.
    request.send();
})

//Creating function to sort from A-Z and Z-A.
function sortTitle(dir) {
    //setting variables
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("myTable");
    switching = true;

    while (switching) {
        //Do not start switching as of yet.
        switching = false;
        rows = table.rows;

        //Go through each row, excluding the headers, and prepare for a switch.
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;

            //Select the first row
            x = rows[i].getElementsByTagName("TD")[0];
            //Select the second row.
            y = rows[i + 1].getElementsByTagName("TD")[0];
            //If sortA_Z button is clicked, switch rows upward.
            if (dir == "asc") {
                //Making the rows not case-sensitive
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {

                    shouldSwitch = true;
                    break;
                }
                //If sortZ_A button is clicked, switch rows downward.
            } else if (dir == "des") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {

                    shouldSwitch = true;
                    break;
                }
            }

        }
        if (shouldSwitch) {
            /*
            Switch the first two rows and continue switching the following rows
            until the condition has been met.
            */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}

//Created the EventListener for the sortTitle() function,
//ascending order.
sortButtonA_Z.addEventListener("click", function() {
    console.log(document.getElementsByTagName("td")[0]);
    sortTitle("asc");
})

//Descending order.
sortButtonZ_A.addEventListener("click", function() {
    console.log(document.getElementsByTagName("td")[0]);
    sortTitle("des");
})


//Function to parse data from API
function renderHTML(dataParse) {
    //variable to insert data from API to Table.
    var table = document.getElementById("myTable");
    //Assuming Total Items being zero means data (therefore book w/ISBN-10) does not exist.
    if (dataParse.totalItems == "0" || document.getElementById("myInputName").value == "") {
        alert("Not a valid ISBN-10.");
        //Create row and insert cells for that row.
    } else {
        var row = table.insertRow(-1);
        var title = row.insertCell(0);
        var authors = row.insertCell(1);
        var publish = row.insertCell(2);
    }

    for (i in dataParse.items) {
        //txt += "<tr><td>" + dataParse.items[i].volumeInfo.title + " is written by " + dataParse.items[i].volumeInfo.authors + ".</td></tr>";
        title.innerHTML = dataParse.items[i].volumeInfo.title;
        authors.innerHTML = dataParse.items[i].volumeInfo.authors;
        publish.innerHTML = dataParse.items[i].volumeInfo.publishedDate;
    }
    //document.getElementById("test").innerHTML = txt;
}
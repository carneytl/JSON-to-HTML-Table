// Declare variables 
var button = document.getElementById("button");
var test = document.getElementById("test");

//store ISBN-10 books here and use randomly for example.
var books = ["1285057090", "0691175756", "1473678455", "0538497815", "1938168186", "1119296692", "0321516583", "1842658891", "0131495089"];

//Adding EventListener to pull from API
button.addEventListener("click", function() {
    var randomBook = books[Math.floor(Math.random() * books.length)];
    console.log(randomBook);
    //Request variable for HTTP
    const request = new XMLHttpRequest();
    request.open("GET", "https://www.googleapis.com/books/v1/volumes?q=isbn:" + randomBook);
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


//Function to parse data from API
function renderHTML(dataParse) {
    //variable to insert data from API to Table.
    var table = document.getElementById("myTable");
    var row = table.insertRow(0);
    var titleRow = row.insertCell(0);
    var authorsRow = row.insertCell(1);
    var publishRow = row.insertCell(2);

    for (i in dataParse.items) {
        //txt += "<tr><td>" + dataParse.items[i].volumeInfo.title + " is written by " + dataParse.items[i].volumeInfo.authors + ".</td></tr>";
        titleRow.innerHTML = dataParse.items[i].volumeInfo.title;
        authorsRow.innerHTML = dataParse.items[i].volumeInfo.authors;
        publishRow.innerHTML = dataParse.items[i].volumeInfo.publishedDate;
    }

    //document.getElementById("test").innerHTML = txt;
}
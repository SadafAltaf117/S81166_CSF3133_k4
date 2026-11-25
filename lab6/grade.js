/*
 * LIST OF ERRORS IDENTIFIED AND FIXED:
 * Error 1 (grade.html, Line 9): Missing 'return' in onsubmit="checkMark()" caused form submission to reload the page and erase the result. Fixed to onsubmit="return checkMark()".
 * Error 2 (grade.html, Line 17): Wrong function casing onclick="showtable()" instead of onclick="showTable()".
 * Error 3 (grade.html, Line 19): Wrong script filename src="grades.js" instead of src="grade.js".
 * Error 4 (grade.js, Line 2 & 3): Missing '=' assignment operator after variable declarations ('let name' and 'let mark'), plus mismatched bracket '["mark")'.
 * Error 5 (grade.js, Line 5): Single '=' assignment (name = "") instead of comparison (name === ""), plus missing closing '}' for the if block.
 * Error 6 (grade.js, Line 8 & 13): Misspelled 'isNan(mark)' instead of 'isNaN(mark)', and logical order placed numeric check after range check instead of before it.
 * Error 7 (grade.js, Line 11): Used '&&' (mark < 0 && mark > 100) which is impossible, instead of '||' (mark < 0 || mark > 100).
 * Error 8 (grade.js, Line 23 & 24): Missing closing ')' in else if (mark >= 50), missing ';' after grade = "C", and missing '=' in grade "F".
 * Error 9 (grade.js, Line 28, 29, 30): Wrong capitalization 'getElementByID' instead of 'getElementById', missing quotes around " got grade ", British spelling 'style.colour' instead of 'style.color', and 'return true' reloaded page instead of 'return false'.
 * Error 10 (grade.js, Line 37, 39, 41): Loop started at i = 1 instead of i = 0 (skipping grade A), closing '</table>' was placed inside the loop, and 'innerHtml' had wrong casing instead of 'innerHTML'.
 */

// Validate inputs, determine grade, update color and timestamp
function checkMark() {
    let name = document.forms["gradeForm"]["name"].value.trim();
    let mark = document.forms["gradeForm"]["mark"].value.trim();

    // Check if name is empty
    if (name === "") {
        alert("Name must be filled out.");
        return false;
    }

    // Check if mark is empty (Extended requirement)
    if (mark === "") {
        alert("Mark field cannot be empty.");
        return false;
    }

    // Check if mark is not a number
    if (isNaN(mark)) {
        alert("Please enter a valid numeric value.");
        return false;
    }

    mark = parseInt(mark);

    // Check if mark is out of 0-100 range
    if (mark < 0 || mark > 100) {
        alert("Mark must be between 0 and 100.");
        return false;
    }

    // Determine grade and color
    let grade;
    let resultColor;

    if (mark >= 80) {
        grade = "A";
        resultColor = "green";
    } else if (mark >= 65) {
        grade = "B";
        resultColor = "green";
    } else if (mark >= 50) {
        grade = "C";
        resultColor = "orange";
    } else {
        grade = "F";
        resultColor = "red";
    }

    // Display result and date/time checked
    let resultEl = document.getElementById("result");
    resultEl.innerHTML = name + " got grade " + grade;
    resultEl.style.color = resultColor;

    let timeEl = document.getElementById("checkedTime");
    timeEl.innerHTML = "Checked on: " + new Date();
    timeEl.style.color = resultColor;

    // Prevent page refresh so result stays visible
    return false;
}

// Generate a random whole number from 0 to 100 into the mark field
function generateRandomMark() {
    let randomMark = Math.floor(Math.random() * 101);
    document.getElementById("mark").value = randomMark;
}

// Display all 4 grades and mark ranges in an HTML table
function showTable() {
    let grades = ["A", "B", "C", "F"];
    let ranges = ["80-100", "65-79", "50-64", "0-49"];

    let tableHTML = "<table><tr><th>Grade</th><th>Mark range</th></tr>";
    for (let i = 0; i < grades.length; i++) {
        tableHTML += "<tr><td>" + grades[i] + "</td><td>" + ranges[i] + "</td></tr>";
    }
    tableHTML += "</table>";

    document.getElementById("tableContainer").innerHTML = tableHTML;
}
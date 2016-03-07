var turn = true;
var selected;
var output = [];

function checkClick() {
    alert("clicked!");
}

function handleClick(a, b) {
    selected = [a, b];
    var previous = document.getElementById(getSelected().toString()).innerHTML;
    if (previous === "") {
        document.getElementById(getSelected().toString()).innerHTML = turn? "X": "O";
    }
    checkWin();
    document.getElementById("output").innerHTML = getSelected();

    turnSwitch();
}

function filterMaker(comparison) {
    return function(a) {
        return a === comparison;
    }
}

function checkArray(arr) {
    var filtered = arr.filter(filterMaker(turn? "X":"O"));
    return filtered.length != 0;
}

function checkCol(i) {
    var col = [
        document.getElementById("0," + i).innerHTML,
        document.getElementById("1," + i).innerHTML,
        document.getElementById("2," + i).innerHTML
    ];

    return checkArray(col);

}

function checkRow(i) {
    var row = [
        document.getElementById(i + ",0").innerHTML,
        document.getElementById(i + ",1").innerHTML,
        document.getElementById(i + ",2").innerHTML
    ];

    return checkArray(row);
}

function checkDiagonals() {

}

function checkWin() {
    for (var i = 0; i < 3; ++i) {
        checkRow(i);
    }
    for (var i = 0; i < 3; ++i) {
        checkCol(i);
    }
    checkDiagonals();
}

function sendToOutput(string) {
    output.push(string);
    document.getElementById("output").innerHTML = output.toString();
}

function getSelected() {
    return selected.toString();
}

function turnSwitch() {
    turn = !turn;
}
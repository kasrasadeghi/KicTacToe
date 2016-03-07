var turn = true;
var selected;
var outputCount = 0;
var won = false;

function reset() {
    turn = true;
    selected = [];
    outputCount = 0;
    won = false;
    var list = document.getElementById("outputList");
    while(list.childElementCount) list.removeChild(list.firstChild);
    for(var i = 0; i < 3; ++i) {
        for (var j = 0; j < 3; ++j) {
            document.getElementById(i + "," + j).innerHTML = "";
        }
    }
}

function handleClick(a, b) {
    if (!won) {
        var win = "";
        selected = [a, b];
        var previous = document.getElementById(getSelected()).innerHTML;
        if (previous === "") {
            document.getElementById(getSelected()).innerHTML = turn? "X": "O";
            win = checkWin();
            switchTurn();
        }
        sendToOutput(getSelected());
        if (win != "") {
            sendToOutput(win);
            won = true;
            handleVictory();
            //TODO: get victory cross
        }
    }
}

function handleVictory() {
    var string = "Play Again?";
    var parent = document.getElementById("outputList");
    var child = document.createElement("li");
    child.innerHTML = "> " + string;
    child.onclick = function() {reset();};
    child.style="color:red";

    if (++outputCount > 20) {
        parent.removeChild(parent.lastElementChild);
    }
    parent.insertBefore(child, parent.firstChild);
}

function filterMaker(comparison) {
    return function(a) {
        return a === comparison;
    }
}

//region function checkWin() {...}

function checkWin() {
    for (var i = 0; i < 3; ++i) {
        if (checkRow(i)) {
            return (turn?"X":"O") + " wins!";
        }
    }
    for (var i = 0; i < 3; ++i) {
        if (checkCol(i)) {
            return (turn?"X":"O") + " wins!";
        }
    }
    if(checkDiagonals()) {
        return (turn?"X":"O") + " wins!";
    }
    else if (checkFull()) {
        return "Tied!"
    }
    return "";
}

function checkFull() {
    var board= [];
    for (var i = 0; i < 3; ++i) board.push(
        document.getElementById("0," + i).innerHTML,
        document.getElementById("1," + i).innerHTML,
        document.getElementById("2," + i).innerHTML
    );

    var emptySpaces = board.filter(filterMaker(""));
    return emptySpaces.length == 0;
}

function checkCol(i) {
    var col = [
        document.getElementById("0," + i).innerHTML,
        document.getElementById("1," + i).innerHTML,
        document.getElementById("2," + i).innerHTML
    ];

    return checkArrayForWin(col);

}

function checkRow(i) {
    var row = [
        document.getElementById(i + ",0").innerHTML,
        document.getElementById(i + ",1").innerHTML,
        document.getElementById(i + ",2").innerHTML
    ];

    return checkArrayForWin(row);
}

function checkMain() {
    var set = [
        document.getElementById("0,0").innerHTML,
        document.getElementById("1,1").innerHTML,
        document.getElementById("2,2").innerHTML
    ];

    return checkArrayForWin(set);
}

function checkOff() {
    var set = [
        document.getElementById("2,0").innerHTML,
        document.getElementById("1,1").innerHTML,
        document.getElementById("0,2").innerHTML
    ];

    return checkArrayForWin(set);
}

function checkDiagonals() {
    if (checkMain()) {
        return true;
    }
    else if (checkOff()) {
        return true;
    }
    return false;
}

function checkArrayForWin(arr) {
    var filtered = arr.filter(filterMaker(turn? "X":"O"));
    return filtered.length === arr.length;
}

//endregion
//TODO: implement tying

function sendToOutput(string) {
    var parent = document.getElementById("outputList");
    var child = document.createElement("li");
    child.innerHTML = "> " + string;

    if (++outputCount > 20) {
        parent.removeChild(parent.lastElementChild);
    }
    parent.insertBefore(child, parent.firstChild);
}

function getSelected() {
    return selected.toString();
}

function switchTurn() {
    turn = !turn;
}
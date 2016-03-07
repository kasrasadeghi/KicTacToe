
function tally(playerNumber) {
    var place = document.getElementById(playerNumber);
    var points = place.innerHTML;
    if (points === "Points:") {
        place.innerHTML = "Points: 1";
    } else {
        place.innerHTML = "Points: " + (parseInt(points.substring(7)) + 1) + "";
    }

}
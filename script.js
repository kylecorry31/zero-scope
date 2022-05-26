function getElementById(id){
    return document.getElementById(id);
}

function getVerticalMOAPerClick(){
    return +getElementById("vertical-moa-per-click").value;
}

function getHorizontalMOAPerClick(){
    return +getElementById("horizontal-moa-per-click").value;
}

function getX(){
    return +getElementById("x").value;
}

function getY(){
    return +getElementById("y").value;
}

function getDistance(){
    return +getElementById("distance").value;
}


const referenceDistance = 100;
const referenceMOA = 1.047;

function saveScope(){
    const verticalMOAPerClick = getVerticalMOAPerClick();
    const horizontalMOAPerClick = getHorizontalMOAPerClick();
    const scope = {
        verticalMOAPerClick,
        horizontalMOAPerClick
    };
    localStorage.setItem("scope", JSON.stringify(scope));
}

function loadScope(){
    const scope = JSON.parse(localStorage.getItem("scope"));
    if(scope){
        getElementById("vertical-moa-per-click").value = scope.verticalMOAPerClick;
        getElementById("horizontal-moa-per-click").value = scope.horizontalMOAPerClick;
    }
}

function calculate(){
    const verticalMOAPerClick = getVerticalMOAPerClick();
    const horizontalMOAPerClick = getHorizontalMOAPerClick();
    const x = getX();
    const y = getY();
    const distance = getDistance();

    saveScope();

    const inchesPerMOA = (distance / referenceDistance) * referenceMOA;
    const xMOA = x / inchesPerMOA;
    const yMOA = y / inchesPerMOA;


    const xClicks = Math.round(xMOA / horizontalMOAPerClick);
    const yClicks = Math.round(yMOA / verticalMOAPerClick);

    const xDirection = xMOA > 0 ? "left" : "right";
    const yDirection = yMOA > 0 ? "down" : "up";

    getElementById('vertical').innerText = `${Math.abs(yClicks)} ${yDirection}`;
    getElementById('horizontal').innerText = `${Math.abs(xClicks)} ${xDirection}`;
}

document.onload = loadScope();
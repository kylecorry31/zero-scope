function getElementById(id){
    return document.getElementById(id);
}

function getInchesPerClick(){
    return +getElementById("inches-per-click").value;
}

function getYards(){
    return +getElementById("yards").value;
}

function getOffset(){
    return +getElementById("offset").value;
}

function getDistance(){
    return +getElementById("distance").value;
}


const referenceDistance = 100;
const referenceMOA = 1.047;

function saveScope(){
    const inches = getInchesPerClick();
    const yards = getYards();
    const scope = {
        inches,
        yards
    };
    localStorage.setItem("scope", JSON.stringify(scope));
}

function loadScope(){
    const scope = JSON.parse(localStorage.getItem("scope"));
    if(scope){
        getElementById("inches-per-click").value = scope.inches;
        getElementById("yards").value = scope.yards;
    } else {
        getElementById("yards").value = 100;
    }
}

function calculate(){
    const inchesPerClick = getInchesPerClick();
    const yards = getYards();
    const offset = getOffset();
    const distance = getDistance();

    console.log(inchesPerClick, yards, offset, distance);

    saveScope();

    const clicks = Math.round((offset / inchesPerClick) * (yards / distance));

    const xDirection = clicks > 0 ? "Left" : "Right";
    const yDirection = clicks > 0 ? "Down" : "Up";

    getElementById('clicks').innerText = `${Math.abs(clicks)} Clicks`;
    getElementById('direction').innerText = `${xDirection} / ${yDirection}`;
}

document.onload = loadScope();
import { startkMeans } from "./kMeans.js";
import { startDBSCAN } from "./DBSCAN.js";
import { showOldPoints } from "./canvas_handler.js";
import { activeMode } from "./main.js";

export {
    buttonsHandler,
    buttonsRenderEvent,
    buttonsRender,
    disableButtons,
    enableButtons
}

const COLOR_ACTIVE = '#A449D8';
const COLOR_UNACTIVE = '#080D0D';

function buttonsHandler(activeNumber, e) {
    activeMode.value = activeNumber;
    buttonsRender();

    if (activeMode.value === 3) {
        buttonsRender();
        startkMeans();
        buttonsRender();

    } else if (activeMode.value === 4) {
        buttonsRender();
        startDBSCAN();
        buttonsRender();

    } else if (activeMode.value === 5) {
        buttonsRender();
        showOldPoints();
        activeMode.value = 0;
        buttonsRender();
    }

}

function buttonsRenderEvent(e) {
    if (e.type === 'mouseover') {
        document.getElementById(e.target.id).style.backgroundColor = COLOR_ACTIVE;

    } else if (e.type === 'mouseout') {
        if (e.target.id === 'add_point' && activeMode.value != 1) {
            document.getElementById('add_point').style.backgroundColor = COLOR_UNACTIVE;

        } else if (e.target.id === 'remove_point' && activeMode.value != 2) {
            document.getElementById('remove_point').style.backgroundColor = COLOR_UNACTIVE;

        } else if (e.target.id === 'show_old_points' && activeMode.value != 5) {
            document.getElementById('show_old_points').style.backgroundColor = COLOR_UNACTIVE;

        } else if (e.target.id === 'clear') {
            document.getElementById('clear').style.backgroundColor = COLOR_UNACTIVE;

        } else if (e.target.id === 'kMeans') {
            document.getElementById('kMeans').style.backgroundColor = COLOR_UNACTIVE;

        } else if (e.target.id === 'DBSCAN') {
            document.getElementById('DBSCAN').style.backgroundColor = COLOR_UNACTIVE;

        }
    }
}

function buttonsRender() {
    if (activeMode.value === 0) {
        document.getElementById('add_point').style.backgroundColor = COLOR_UNACTIVE;
        document.getElementById('remove_point').style.backgroundColor = COLOR_UNACTIVE;
        document.getElementById('kMeans').style.backgroundColor = COLOR_UNACTIVE;
        document.getElementById('DBSCAN').style.backgroundColor = COLOR_UNACTIVE;
        document.getElementById('show_old_points').style.backgroundColor = COLOR_UNACTIVE;

    } else if (activeMode.value === 1) {
        document.getElementById('add_point').style.backgroundColor = COLOR_ACTIVE;
        document.getElementById('remove_point').style.backgroundColor = COLOR_UNACTIVE;
        document.getElementById('kMeans').style.backgroundColor = COLOR_UNACTIVE;
        document.getElementById('DBSCAN').style.backgroundColor = COLOR_UNACTIVE;
        document.getElementById('show_old_points').style.backgroundColor = COLOR_UNACTIVE;

    } else if (activeMode.value === 2) {
        document.getElementById('add_point').style.backgroundColor = COLOR_UNACTIVE;
        document.getElementById('remove_point').style.backgroundColor = COLOR_ACTIVE;
        document.getElementById('kMeans').style.backgroundColor = COLOR_UNACTIVE;
        document.getElementById('DBSCAN').style.backgroundColor = COLOR_UNACTIVE;
        document.getElementById('show_old_points').style.backgroundColor = COLOR_UNACTIVE;

    } else if (activeMode.value === 3) {
        document.getElementById('add_point').style.backgroundColor = COLOR_UNACTIVE;
        document.getElementById('remove_point').style.backgroundColor = COLOR_UNACTIVE;
        document.getElementById('kMeans').style.backgroundColor = COLOR_ACTIVE;
        document.getElementById('DBSCAN').style.backgroundColor = COLOR_UNACTIVE;
        document.getElementById('show_old_points').style.backgroundColor = COLOR_UNACTIVE;

    } else if (activeMode.value === 4) {
        document.getElementById('add_point').style.backgroundColor = COLOR_UNACTIVE;
        document.getElementById('remove_point').style.backgroundColor = COLOR_UNACTIVE;
        document.getElementById('kMeans').style.backgroundColor = COLOR_UNACTIVE;
        document.getElementById('DBSCAN').style.backgroundColor = COLOR_ACTIVE;
        document.getElementById('show_old_points').style.backgroundColor = COLOR_UNACTIVE;

    } else if (activeMode.value === 5) {
        document.getElementById('add_point').style.backgroundColor = COLOR_UNACTIVE;
        document.getElementById('remove_point').style.backgroundColor = COLOR_UNACTIVE;
        document.getElementById('kMeans').style.backgroundColor = COLOR_UNACTIVE;
        document.getElementById('DBSCAN').style.backgroundColor = COLOR_UNACTIVE;
        document.getElementById('show_old_points').style.backgroundColor = COLOR_ACTIVE;
    }
}

function disableButtons() {
    document.getElementById('add_point').disabled = true;
    document.getElementById('remove_point').disabled = true;
    document.getElementById('show_old_points').disabled = true;
    document.getElementById('getClusters').disabled = true;
    document.getElementById('kMeans').disabled = true;
    document.getElementById('DBSCAN').disabled = true;
}

function enableButtons() {
    document.getElementById('add_point').disabled = false;
    document.getElementById('remove_point').disabled = false;
    document.getElementById('show_old_points').disabled = false;
    document.getElementById('getClusters').disabled = false;
    document.getElementById('kMeans').disabled = false;
    document.getElementById('DBSCAN').disabled = false;
}
import { activeMode } from "./main.js";
import { startAlgorithm } from "./algorithm.js";
import { drawEdges } from "./canvas_handler.js";

export {
    buttonsHandler,
    buttonsRenderEvent,
    disableButtons,
    enableButtons
}

const COLOR_ACTIVE = '#7AB0DC';
const COLOR_UNACTIVE = '#247ABF';

function buttonsHandler(activeNumber, e) {
    activeMode.value = activeNumber;
    buttonsRender();

    if (activeMode.value === 2) {
        buttonsRender();
        drawEdges();
        buttonsRender();

    } else if (activeMode.value === 4) {
        buttonsRender();
        startAlgorithm();
        buttonsRender();
    }
}

function buttonsRenderEvent(e) {
    if (e.type === 'mouseover') {
        document.getElementById(e.target.id).style.backgroundColor = COLOR_ACTIVE;

    } else if (e.type === 'mouseout') {
        if (e.target.id === 'add_vertex' && activeMode.value !== 1) {
            document.getElementById('add_vertex').style.backgroundColor = COLOR_UNACTIVE;

        } else if (e.target.id === 'draw_edjes') {
            document.getElementById('draw_edjes').style.backgroundColor = COLOR_UNACTIVE;

        } else if (e.target.id === 'remove_vertex' && activeMode.value !== 3) {
            document.getElementById('remove_vertex').style.backgroundColor = COLOR_UNACTIVE;

        } else if (e.target.id === 'start_algo') {
            document.getElementById('start_algo').style.backgroundColor = COLOR_UNACTIVE;

        } else if (e.target.id === 'clear') {
            document.getElementById('clear').style.backgroundColor = COLOR_UNACTIVE;

        }
    }
}

export function buttonsRender() {
    if (activeMode.value === 0) {
        document.getElementById('add_vertex').style.backgroundColor = COLOR_UNACTIVE;
        document.getElementById('draw_edjes').style.backgroundColor = COLOR_UNACTIVE;
        document.getElementById('remove_vertex').style.backgroundColor = COLOR_UNACTIVE;
        document.getElementById('start_algo').style.backgroundColor = COLOR_UNACTIVE;

    } else if (activeMode.value === 1) {
        document.getElementById('add_vertex').style.backgroundColor = COLOR_ACTIVE;
        document.getElementById('draw_edjes').style.backgroundColor = COLOR_UNACTIVE;
        document.getElementById('remove_vertex').style.backgroundColor = COLOR_UNACTIVE;
        document.getElementById('start_algo').style.backgroundColor = COLOR_UNACTIVE;

    } else if (activeMode.value === 2) {
        document.getElementById('add_vertex').style.backgroundColor = COLOR_UNACTIVE;
        document.getElementById('draw_edjes').style.backgroundColor = COLOR_ACTIVE;
        document.getElementById('remove_vertex').style.backgroundColor = COLOR_UNACTIVE;
        document.getElementById('start_algo').style.backgroundColor = COLOR_UNACTIVE;

    } else if (activeMode.value === 3) {
        document.getElementById('add_vertex').style.backgroundColor = COLOR_UNACTIVE;
        document.getElementById('draw_edjes').style.backgroundColor = COLOR_UNACTIVE;
        document.getElementById('remove_vertex').style.backgroundColor = COLOR_ACTIVE;
        document.getElementById('start_algo').style.backgroundColor = COLOR_UNACTIVE;

    } else if (activeMode.value === 4) {
        document.getElementById('add_vertex').style.backgroundColor = COLOR_UNACTIVE;
        document.getElementById('draw_edjes').style.backgroundColor = COLOR_UNACTIVE;
        document.getElementById('remove_vertex').style.backgroundColor = COLOR_UNACTIVE;
        document.getElementById('start_algo').style.backgroundColor = COLOR_ACTIVE;

    }
}

function disableButtons() {
    document.getElementById('add_vertex').disabled = true;
    document.getElementById('draw_edjes').disabled = true;
    document.getElementById('remove_vertex').disabled = true;
    document.getElementById('start_algo').disabled = true;
}

function enableButtons() {
    document.getElementById('add_vertex').disabled = false;
    document.getElementById('draw_edjes').disabled = false;
    document.getElementById('remove_vertex').disabled = false;
    document.getElementById('start_algo').disabled = false;
}
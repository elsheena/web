// Importing necessary modules and functions from other files
import { activeMode } from "./main.js";
import { startAlgorithm } from "./algorithm.js";
import { drawEdges } from "./canvas_handler.js";

// Exporting button handling functions
export {
    buttonsHandler,
    buttonsRenderEvent,
    disableButtons,
    enableButtons
}

// Colors for active and inactive buttons
const COLOR_ACTIVE = '#7AB0DC';
const COLOR_UNACTIVE = '#247ABF';

// Function to handle button clicks
function buttonsHandler(activeNumber, e) {
    // Setting the active mode value
    activeMode.value = activeNumber;
    // Rendering buttons based on active mode
    buttonsRender();

    // Handling button actions based on active mode
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

// Function to handle button hover events
function buttonsRenderEvent(e) {
    // Changing button color on mouseover
    if (e.type === 'mouseover') {
        document.getElementById(e.target.id).style.backgroundColor = COLOR_ACTIVE;
    } else if (e.type === 'mouseout') { // Restoring button color on mouseout
        // Restoring button color based on active mode and button type
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

// Function to render buttons based on active mode
export function buttonsRender() {
    // Rendering buttons based on active mode
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

// Function to disable all buttons
function disableButtons() {
    document.getElementById('add_vertex').disabled = true;
    document.getElementById('draw_edjes').disabled = true;
    document.getElementById('remove_vertex').disabled = true;
    document.getElementById('start_algo').disabled = true;
}

// Function to enable all buttons
function enableButtons() {
    document.getElementById('add_vertex').disabled = false;
    document.getElementById('draw_edjes').disabled = false;
    document.getElementById('remove_vertex').disabled = false;
    document.getElementById('start_algo').disabled = false;
}
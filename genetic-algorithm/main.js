import { handler } from "./canvas_handler.js";
import { buttonsHandler } from "./buttons_handler.js";
import { buttonsRenderEvent } from "./buttons_handler.js";

const canvas = document.querySelector('canvas');
export const ctx = canvas.getContext('2d');

export const SIZE_WIDTH = 1000,
    SIZE_HEIGHT = 600;

export const LIMIT_NUMBER_VERTEX = 46,
    VERTEX_RADIUS = 20,
    STROKE_WIDTH = 2,
    DEFAULT_FILL_COLOR = 'rgb(131, 118, 46)',
    EDGE_COLOR = 'rgb(212, 220, 233)',
    EDGE_WIDTH = 3;

export const MUTATION_PERCENTAGE = 80,
    COUNT_GENERATIONS = 1000000;

export let vertexList = []; //array of cities
export let adjMatrix = []; //bitişik matrix
export let activeMode = { value: 0 }; //mode for interacting with canvas

canvas.width = SIZE_WIDTH;
canvas.height = SIZE_HEIGHT;


document.getElementById('canvas').addEventListener('click', (e) => { handler(e.offsetX, e.offsetY) });
document.getElementById('add_vertex').addEventListener('click', (e) => {
    buttonsHandler(1, e);
    buttonsRenderEvent(e)
});
document.getElementById('draw_edjes').addEventListener('click', (e) => {
    buttonsHandler(2, e);
    buttonsRenderEvent(e)
});
document.getElementById('remove_vertex').addEventListener('click', (e) => {
    buttonsHandler(3, e);
    buttonsRenderEvent(e)
});
document.getElementById('start_algo').addEventListener('click', (e) => {
    buttonsHandler(4, e);
    buttonsRenderEvent(e)
});
document.getElementById('clear').addEventListener('click', () => { window.location.reload() });

document.getElementById('add_vertex').addEventListener('mouseover', (e) => { buttonsRenderEvent(e) });
document.getElementById('draw_edjes').addEventListener('mouseover', (e) => { buttonsRenderEvent(e) });
document.getElementById('remove_vertex').addEventListener('mouseover', (e) => { buttonsRenderEvent(e) });
document.getElementById('start_algo').addEventListener('mouseover', (e) => { buttonsRenderEvent(e) });
document.getElementById('clear').addEventListener('mouseover', (e) => { buttonsRenderEvent(e) });

document.getElementById('add_vertex').addEventListener('mouseout', (e) => { buttonsRenderEvent(e) });
document.getElementById('draw_edjes').addEventListener('mouseout', (e) => { buttonsRenderEvent(e) });
document.getElementById('remove_vertex').addEventListener('mouseout', (e) => { buttonsRenderEvent(e) });
document.getElementById('start_algo').addEventListener('mouseout', (e) => { buttonsRenderEvent(e) });
document.getElementById('clear').addEventListener('mouseout', (e) => { buttonsRenderEvent(e) });
import {
    handler,
    startDrawing,
    stopDrawing
} from "./canvas_handler.js";
import { buttonsHandler } from "./buttons_handler.js";
import { buttonsRenderEvent } from "./buttons_handler.js";

export {
    canvas,
    ctx,
    SIZE_HEIGHT,
    SIZE_WIDTH,
    POINT_RADIUS,
    RADIUS_CHANGE,
    COUNT_NEIGHBOURS_POINTS,
    LIMIT_CLUSTERS,
    count_clusters,
    data_points
};

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const SIZE_WIDTH = 1000,
    SIZE_HEIGHT = 600,
    POINT_RADIUS = 10,
    LIMIT_CLUSTERS = 27;

const RADIUS_CHANGE = 50,
    COUNT_NEIGHBOURS_POINTS = 2;

export let activeMode = { value: 0 };

let data_points = [],
    count_clusters;

canvas.width = SIZE_WIDTH;
canvas.height = SIZE_HEIGHT;

document.getElementById('canvas').addEventListener('click', (e) => { handler(e) });
document.getElementById('add_point').addEventListener('click', (e) => {
    buttonsHandler(1, e);
    buttonsRenderEvent(e)
});
document.getElementById('remove_point').addEventListener('click', (e) => {
    buttonsHandler(2, e);
    buttonsRenderEvent(e)
});
document.getElementById('kMeans').addEventListener('click', (e) => {
    buttonsHandler(3, e);
    buttonsRenderEvent(e)
});
document.getElementById('DBSCAN').addEventListener('click', (e) => {
    buttonsHandler(4, e);
    buttonsRenderEvent(e)
});
document.getElementById('show_old_points').addEventListener('click', (e) => {
    buttonsHandler(5, e);
    buttonsRenderEvent(e)
});
document.getElementById('clear').addEventListener('click', () => { window.location.reload() });


document.getElementById('canvas').addEventListener('mousedown', startDrawing); //To add points while pressing right click
document.getElementById('canvas').addEventListener('mouseup', stopDrawing);
document.getElementById('canvas').addEventListener('mouseleave', stopDrawing);


document.getElementById('add_point').addEventListener('mouseover', (e) => { buttonsRenderEvent(e) });
document.getElementById('remove_point').addEventListener('mouseover', (e) => { buttonsRenderEvent(e) });
document.getElementById('show_old_points').addEventListener('mouseover', (e) => { buttonsRenderEvent(e) });
document.getElementById('clear').addEventListener('mouseover', (e) => { buttonsRenderEvent(e) });
document.getElementById('kMeans').addEventListener('mouseover', (e) => { buttonsRenderEvent(e) });
document.getElementById('DBSCAN').addEventListener('mouseover', (e) => { buttonsRenderEvent(e) });


document.getElementById('add_point').addEventListener('mouseout', (e) => { buttonsRenderEvent(e) });
document.getElementById('remove_point').addEventListener('mouseout', (e) => { buttonsRenderEvent(e) });
document.getElementById('show_old_points').addEventListener('mouseout', (e) => { buttonsRenderEvent(e) });
document.getElementById('clear').addEventListener('mouseout', (e) => { buttonsRenderEvent(e) });
document.getElementById('kMeans').addEventListener('mouseout', (e) => { buttonsRenderEvent(e) });
document.getElementById('DBSCAN').addEventListener('mouseout', (e) => { buttonsRenderEvent(e) });
import {
    ctx,
    POINT_RADIUS,
    SIZE_HEIGHT,
    SIZE_WIDTH
} from "./main.js";
import {
    data_points,
    activeMode
} from "./main.js"

import { Point } from "./Objects.js";

export {
    addPoint,
    removePoint,
    isCanAddPoint,
    calculateDistance,
    showOldPoints,
    startDrawing,
    stopDrawing,
    handler
};

function handler(event) {
    let x = event.offsetX;
    let y = event.offsetY;

    if (activeMode.value === 1 && isCanAddPoint(x, y)) {
        addPoint(x, y);
    } else if (activeMode.value === 2) {
        removePoint(x, y);
    }
}

function addPoint(x, y) {
    data_points.push(new Point(x, y, 0));
    data_points[data_points.length - 1].draw();
}

function removePoint(x, y) {
    let index = getIndexPoint(x, y);

    if (index != -1) {
        ctx.beginPath();
        ctx.arc(data_points[index].x, data_points[index].y, POINT_RADIUS + 1, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = 'rgb(211, 210, 210)';
        ctx.fill();
        data_points.splice(index, 1);
    }
}

//on and off drawing
function startDrawing() {
    document.getElementById('canvas').addEventListener('mousemove', handler);
}

function stopDrawing() {
    document.getElementById('canvas').removeEventListener('mousemove', handler);
}


function showOldPoints() {
    ctx.clearRect(0, 0, SIZE_WIDTH, SIZE_HEIGHT);

    for (let i = 0; i < data_points.length; i++) {
        data_points[i].draw();
    }
}

function isCanAddPoint(x, y) {
    if (x > POINT_RADIUS && x < SIZE_WIDTH - POINT_RADIUS && y > POINT_RADIUS && y < SIZE_HEIGHT - POINT_RADIUS) {
        let index = getNearestPointIndex(x, y);

        if (index == -1) {
            return true;
        } else if (calculateDistance(data_points[index].x, data_points[index].y, x, y) > 2 * POINT_RADIUS) {
            return true;
        }
    }
    return false;
}

function getIndexPoint(x, y) {
    let index = getNearestPointIndex(x, y);

    if (index != -1) {
        if (calculateDistance(data_points[index].x, data_points[index].y, x, y) < POINT_RADIUS) {
            return index; //hit the top
        } else {
            return -1; //doesnt ^
        }
    } else {
        // The user didnt add any vertex
        return -1;
    }
}

function getNearestPointIndex(x, y) {
    let minDistance = -1;
    let index = -1;

    for (let i = 0; i < data_points.length; i++) {
        let distance = calculateDistance(data_points[i].x, data_points[i].y, x, y);

        if (minDistance == -1) {
            index = i;
            minDistance = distance;

        } else if (distance < minDistance) {
            index = i;
            minDistance = distance;
        }
    }

    return index;
}

function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}
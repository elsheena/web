import { Vertex } from "./classes.js";

import { vertexList } from "./main.js";
import { adjMatrix } from "./main.js";
import { population } from "./main.js";
import { SIZE_HEIGHT } from "./main.js";
import { SIZE_WIDTH } from "./main.js";
import { EDGE_WIDTH } from "./main.js";
import { VERTEX_RADIUS } from "./main.js";
import { ctx } from "./main.js";

export {
    addVertex,
    removeVertex,
    drawEdges,
    deleteEdge,
    drawEdgeAnswer,
    isCanAddVertex,
    getIndexHitVertex,
    disableButtons,
    enableButtons,
};


function addVertex(x, y) {
    vertexList.push(new Vertex(x, y, vertexList.length));
    vertexList[vertexList.length - 1].draw();

    expandAdjMatrix();
}

function removeVertex(index) {
    vertexList[index].remove();
    vertexList.splice(index, 1);

    renumberVertices();
}

function renumberVertices() {
    for (let i = 0; i < vertexList.length; i++) {
        vertexList[i].number = i;
        vertexList[i].draw();
    }
}

function drawEdges() {
    deleteEdge();
    for (let i = 0; i < vertexList.length; i++) {
        for (let j = i + 1; j < vertexList.length; j++) {
            if (i != j) {
                ctx.lineWidth = EDGE_WIDTH;

                ctx.beginPath();
                ctx.strokeStyle = "gray";
                ctx.moveTo(vertexList[i].x, vertexList[i].y);
                ctx.lineTo(vertexList[j].x, vertexList[j].y);
                ctx.stroke();
                ctx.closePath();
            }
        }
    }

    for (let i = 0; i < vertexList.length; i++) {
        vertexList[i].draw();
    }
}

function deleteEdge() {
    ctx.clearRect(0, 0, SIZE_WIDTH, SIZE_HEIGHT);

    for (let i = 0; i < vertexList.length; i++) {
        vertexList[i].draw;
    }
}

function drawEdgeAnswer(color) {
    for (let i = 0; i < vertexList.length; i++) {

        if (i === population[0].chromosome.length - 1) {
            let first_ver = population[0].chromosome[0];
            let ver_last = population[0].chromosome[population[0].chromosome.length - 1];

            ctx.lineWidth = EDGE_WIDTH + 2;
            ctx.beginPath();
            ctx.moveTo(vertexList[first_ver].x, vertexList[first_ver].y);
            ctx.lineTo(vertexList[ver_last].x, vertexList[ver_last].y);
            ctx.strokeStyle = color;
            ctx.stroke();
            ctx.closePath();

            for (let i = 0; i < vertexList.length; i++) {
                vertexList[i].draw();
            }

        } else {

            let ver1 = population[0].chromosome[i];
            let ver2 = population[0].chromosome[i + 1];

            ctx.lineWidth = EDGE_WIDTH + 2;
            ctx.beginPath();
            ctx.moveTo(vertexList[ver1].x, vertexList[ver1].y);
            ctx.lineTo(vertexList[ver2].x, vertexList[ver2].y);
            ctx.strokeStyle = color;
            ctx.stroke();
            ctx.closePath();

            for (let i = 0; i < vertexList.length; i++) {
                vertexList[i].draw();
            }
        }
    }
}


function isCanAddVertex(x, y) {
    if (x > VERTEX_RADIUS && x < SIZE_WIDTH - VERTEX_RADIUS && y > VERTEX_RADIUS && y < SIZE_HEIGHT - VERTEX_RADIUS) {
        let index = getNearestVertexIndex(x, y);

        if (index == -1) {
            return true;
        } else if (calculateDistance(vertexList[index].x, vertexList[index].y, x, y) > 2 * VERTEX_RADIUS) {
            return true;
        }
    }
    return false;
}

function getIndexHitVertex(x, y) {
    let index = getNearestVertexIndex(x, y);

    if (index != -1) {
        if (calculateDistance(vertexList[index].x, vertexList[index].y, x, y) < VERTEX_RADIUS) {
            return index; //hit the top
        } else {
            return -1; //missed the top
        }
    } else {
        // the user has not added any vertices, but is trying to select something (probably)
        return index;
    }
}

function getNearestVertexIndex(x, y) {
    let minDistance = -1;
    let index = -1;

    for (let i = 0; i < vertexList.length; i++) {
        let distance = calculateDistance(vertexList[i].x, vertexList[i].y, x, y);

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

function expandAdjMatrix() {
    if (adjMatrix.length == 0) { //the first city
        adjMatrix.push([0]);

    } else {
        let newROW = new Array(adjMatrix.length + 1);
        newROW.fill(0);

        for (let i = 0; i < vertexList.length; i++) {
            newROW[i] = calculateDistance(vertexList[vertexList.length - 1].x, vertexList[vertexList.length - 1].y, vertexList[i].x, vertexList[i].y);
        }

        adjMatrix.push(newROW);

        for (let i = 0; i < adjMatrix.length - 1; i++) {
            adjMatrix[i].push(newROW[i]);
        }
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
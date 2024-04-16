// Importing necessary classes and variables from other files
import { Vertex } from "./classes.js";
import { vertexList } from "./main.js";
import { adjMatrix } from "./main.js";
import { population } from "./main.js";
import { SIZE_HEIGHT } from "./main.js";
import { SIZE_WIDTH } from "./main.js";
import { EDGE_WIDTH } from "./main.js";
import { VERTEX_RADIUS } from "./main.js";
import { ctx } from "./main.js";

// Exporting functions for external use
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

// Function to add a new vertex to the vertex list and draw it on the canvas
function addVertex(x, y) {
    // Create a new vertex object and add it to the vertex list
    vertexList.push(new Vertex(x, y, vertexList.length));
    // Draw the newly added vertex on the canvas
    vertexList[vertexList.length - 1].draw();
    // Expand the adjacency matrix to accommodate the new vertex
    expandAdjMatrix();
}

// Function to remove a vertex from the vertex list and re-draw the canvas
function removeVertex(index) {
    // Remove the vertex from the canvas and the vertex list
    vertexList[index].remove();
    vertexList.splice(index, 1);
    // Renumber the remaining vertices
    renumberVertices();
}

// Function to renumber vertices after removal
function renumberVertices() {
    // Update the vertex numbers and redraw them on the canvas
    for (let i = 0; i < vertexList.length; i++) {
        vertexList[i].number = i;
        vertexList[i].draw();
    }
}

// Function to draw edges between vertices on the canvas
function drawEdges() {
    // Clear the canvas first
    deleteEdge();
    // Loop through all pairs of vertices and draw edges between them
    for (let i = 0; i < vertexList.length; i++) {
        for (let j = i + 1; j < vertexList.length; j++) {
            if (i != j) {
                // Set the edge width and color
                ctx.lineWidth = EDGE_WIDTH;
                ctx.beginPath();
                ctx.strokeStyle = "gray";
                // Draw the edge between two vertices
                ctx.moveTo(vertexList[i].x, vertexList[i].y);
                ctx.lineTo(vertexList[j].x, vertexList[j].y);
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
    // Redraw all vertices on the canvas
    for (let i = 0; i < vertexList.length; i++) {
        vertexList[i].draw();
    }
}

// Function to delete all edges from the canvas
function deleteEdge() {
    // Clear the canvas
    ctx.clearRect(0, 0, SIZE_WIDTH, SIZE_HEIGHT);
    // Redraw all vertices on the canvas
    for (let i = 0; i < vertexList.length; i++) {
        vertexList[i].draw();
    }
}

// Function to draw the optimal tour path on the canvas
function drawEdgeAnswer(color) {
    for (let i = 0; i < vertexList.length; i++) {
        // Draw edges between vertices in the optimal tour path
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

// Function to check if a new vertex can be added at a given position
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

// Function to get the index of the nearest vertex to a given position
function getIndexHitVertex(x, y) {
    let index = getNearestVertexIndex(x, y);
    if (index != -1) {
        if (calculateDistance(vertexList[index].x, vertexList[index].y, x, y) < VERTEX_RADIUS) {
            return index; // Hit the vertex
        } else {
            return -1; // Missed the vertex
        }
    } else {
        // The user has not added any vertices, but is trying to select something (probably)
        return index;
    }
}

// Function to find the index of the nearest vertex to a given position
function getNearestVertexIndex(x, y) {
    let minDistance = -1;
    let index = -1;
    // Loop through all vertices and find the nearest one
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

// Function to calculate the distance between two points
function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

// Function to disable buttons
function disableButtons() {
    document.getElementById('add_vertex').disabled = true;
    document.getElementById('draw_edjes').disabled = true;
    document.getElementById('remove_vertex').disabled = true;
    document.getElementById('start_algo').disabled = true;
}

// Function to enable buttons
function enableButtons() {
    document.getElementById('add_vertex').disabled = false;
    document.getElementById('draw_edjes').disabled = false;
    document.getElementById('remove_vertex').disabled = false;
    document.getElementById('start_algo').disabled = false;
}
// Importing necessary modules and variables from other files
import { Vertex } from "./classes.js";
import { EDGE_COLOR, vertexList } from "./main.js";
import { population } from "./algorithm.js";
import { SIZE_HEIGHT } from "./main.js";
import { SIZE_WIDTH } from "./main.js";
import { EDGE_WIDTH } from "./main.js";
import { VERTEX_RADIUS } from "./main.js";
import { ctx } from "./main.js";
import { activeMode } from "./main.js";
import { LIMIT_NUMBER_VERTEX } from "./main.js";

// Exporting functions for handling vertices and edges
export {
    addVertex,
    removeVertex,
    drawEdges,
    deleteEdge,
    drawEdgeAnswer,
    isCanAddVertex,
    getIndexHitVertex,
    handler,
    calculateDistance
};

// Function to handle user interaction with canvas
function handler(x, y) {
    // If in vertex addition mode and it's possible to add a vertex
    if (activeMode.value === 1 && isCanAddVertex(x, y)) {
        // Check if the vertex limit is reached
        if (vertexList.length + 1 > LIMIT_NUMBER_VERTEX) {
            alert("The limit (50) on the number of cities has been exceeded");
        } else {
            addVertex(x, y);
        }
    } else if (activeMode.value === 3) { // If in vertex removal mode
        removeVertex(x, y);
    }
}

// Function to add a vertex to the canvas
function addVertex(x, y) {
    // Create a new vertex object and add it to the vertex list
    vertexList.push(new Vertex(x, y, vertexList.length));
    // Draw the newly added vertex on the canvas
    vertexList[vertexList.length - 1].draw();
}

// Function to remove a vertex from the canvas
function removeVertex(x, y) {
    // Find the index of the vertex that was clicked on
    let index = getIndexHitVertex(x, y);

    // If a vertex was clicked on
    if (index != -1) {
        // Clear the area around the vertex
        ctx.beginPath();
        ctx.arc(vertexList[index].x, vertexList[index].y, VERTEX_RADIUS + 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = EDGE_COLOR;
        ctx.fill();

        // Remove the vertex from the vertex list
        vertexList.splice(index, 1);
    }

    // Renumber the vertices after removal
    renumberVertices();
}

// Function to renumber the vertices after removal
function renumberVertices() {
    // Clear the canvas
    deleteEdge();
    // Loop through all vertices and redraw them with new numbers
    for (let i = 0; i < vertexList.length; i++) {
        vertexList[i].number = i;
        vertexList[i].draw();
    }
}

// Function to draw edges between vertices
function drawEdges() {
    // Clear existing edges on the canvas
    deleteEdge();
    // Loop through all pairs of vertices
    for (let i = 0; i < vertexList.length; i++) {
        for (let j = i + 1; j < vertexList.length; j++) {
            if (i != j) {
                // Draw an edge between each pair of vertices
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

    // Redraw all vertices
    for (let i = 0; i < vertexList.length; i++) {
        vertexList[i].draw();
    }
}

// Function to delete all edges from the canvas
function deleteEdge() {
    // Clear the canvas
    ctx.clearRect(0, 0, SIZE_WIDTH, SIZE_HEIGHT);
    // Redraw all vertices
    for (let i = 0; i < vertexList.length; i++) {
        vertexList[i].draw; // Missing parentheses to call the function
    }
}

// Function to draw the best path found by the algorithm
function drawEdgeAnswer(color) {
    for (let i = 0; i < vertexList.length; i++) {
        if (i === population[0].chromosome.length - 1) {
            let first_ver = population[0].chromosome[0];
            let ver_last = population[0].chromosome[population[0].chromosome.length - 1];

            // Draw the edge between the first and last vertices
            ctx.lineWidth = EDGE_WIDTH + 2;
            ctx.beginPath();
            ctx.moveTo(vertexList[first_ver].x, vertexList[first_ver].y);
            ctx.lineTo(vertexList[ver_last].x, vertexList[ver_last].y);
            ctx.strokeStyle = color;
            ctx.stroke();
            ctx.closePath();

            // Redraw all vertices
            for (let i = 0; i < vertexList.length; i++) {
                vertexList[i].draw();
            }
        } else {
            let ver1 = population[0].chromosome[i];
            let ver2 = population[0].chromosome[i + 1];

            // Draw edges between consecutive vertices in the best path
            ctx.lineWidth = EDGE_WIDTH + 2;
            ctx.beginPath();
            ctx.moveTo(vertexList[ver1].x, vertexList[ver1].y);
            ctx.lineTo(vertexList[ver2].x, vertexList[ver2].y);
            ctx.strokeStyle = color;
            ctx.stroke();
            ctx.closePath();

            // Redraw all vertices
            for (let i = 0; i < vertexList.length; i++) {
                vertexList[i].draw();
            }
        }
    }
}

// Function to check if a vertex can be added at the given coordinates
function isCanAddVertex(x, y) {
    if (x > VERTEX_RADIUS && x < SIZE_WIDTH - VERTEX_RADIUS && y > VERTEX_RADIUS && y < SIZE_HEIGHT - VERTEX_RADIUS) {
        let index = getNearestVertexIndex(x, y);

        // Check if no vertex is nearby or if the distance is greater than the diameter of a vertex
        if (index == -1 || calculateDistance(vertexList[index].x, vertexList[index].y, x, y) > 2 * VERTEX_RADIUS) {
            return true;
        }
    }
    return false;
}

// Function to get the index of the nearest vertex to the given coordinates
function getIndexHitVertex(x, y) {
    let index = getNearestVertexIndex(x, y);

    if (index != -1) {
        if (calculateDistance(vertexList[index].x, vertexList[index].y, x, y) < VERTEX_RADIUS) {
            return index; // Hit the vertex
        } else {
            return -1; // Missed the vertex
        }
    } else {
        // No vertices exist, or the click is outside of the canvas
        return index;
    }
}

// Function to find the index of the nearest vertex to the given coordinates
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


// function expandAdjMatrix() {
//     if (adjMatrix.length == 0) { //the first vertex
//         adjMatrix.push([0]);

//     } else {
//         let newROW = new Array(adjMatrix.length + 1);
//         newROW.fill(0);

//         for (let i = 0; i < vertexList.length; i++) {
//             newROW[i] = calculateDistance(vertexList[vertexList.length - 1].x, vertexList[vertexList.length - 1].y, vertexList[i].x, vertexList[i].y);
//         }

//         adjMatrix.push(newROW);

//         for (let i = 0; i < adjMatrix.length - 1; i++) {
//             adjMatrix[i].push(newROW[i]);
//         }
//     }
// }
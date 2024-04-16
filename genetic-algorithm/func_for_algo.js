// Importing necessary variables and functions from other files
import { vertexList } from "./main.js";
import { adjMatrix } from "./main.js";
import { calculateDistance } from "./canvas_handler.js";

// Exporting functions for the genetic algorithm
export {
    createDescendant,
    findFitness,
    getRandomInt,
    mutation,
    createAdjMatrix
};

// Function to create a descendant chromosome from two parent chromosomes
function createDescendant(parent1, parent2, point_break) {
    let arr = [];
    let used_gene = [];

    // Initializing an array to keep track of used genes
    for (let i = 0; i < vertexList.length; i++) {
        used_gene[i] = false;
    }

    // Generating descendant chromosome using crossover operation
    for (let i = 0, k = 0; i < parent1.length, k < used_gene.length; i++, k++) {
        if (i < point_break) {
            arr[k] = parent1[i];
            used_gene[parent1[i]] = true;
        } else {
            if (!used_gene[parent2[i]]) {
                arr[k] = parent2[i];
                used_gene[parent2[i]] = true;
            } else {
                i--;
            }
        }
    }

    // Adding remaining unused genes to the descendant chromosome
    if (arr.length != vertexList.length) {
        for (let i = 0; i < parent1.length; i++) {
            if (!used_gene[i]) {
                arr[arr.length] = i;
            }
        }
    }

    return arr;
}

// Function to calculate fitness of a chromosome
function findFitness(mas) {
    let fit = 0;
    // Calculating the total distance of the tour represented by the chromosome
    for (let i = 0; i < mas.length - 1; i++) {
        fit += adjMatrix[mas[i]][mas[i + 1]];
    }
    // Adding the distance from the last city back to the starting city
    fit += adjMatrix[mas[0]][mas[mas.length - 1]];

    return fit;
}

// Function to generate a random integer within a given range
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

// Function to perform mutation on a chromosome
function mutation(descendant) {
    let ind1 = getRandomInt(1, vertexList.length);
    let ind2 = getRandomInt(1, vertexList.length);

    // Swap indices if necessary
    if (ind1 > ind2) {
        [ind1, ind2] = [ind2, ind1];
    } else if (ind1 == ind2) {
        return descendant; // No mutation if indices are equal
    }

    let arr = [];
    let i = ind2;

    // Copy genes from ind2 to the end
    while (arr.length <= ind1 && i < descendant.length) {
        arr[arr.length] = descendant[i];
        i++;
    }

    i = ind1 + 1;

    // Copy genes from ind1 to ind2
    while (i > ind1 && i < ind2) {
        arr[arr.length] = descendant[i];
        i++;
    }

    // Handle circular permutation if ind2 reaches the end
    if (i == ind2) {
        i = 0;
        while (i <= ind1) {
            arr[arr.length] = descendant[i];
            i++;
        }

        i = ind2 + ind1 + 1;
        while (i < descendant.length) {
            arr[arr.length] = descendant[i];
            i++;
        }
    }

    return arr;
}

// Function to create the adjacency matrix representing distances between cities
function createAdjMatrix() {
    // Initialize the adjacency matrix
    for (let i = 0; i < vertexList.length; i++) {
        adjMatrix.push(new Array(vertexList.length));
    }

    // Calculate distances between each pair of cities
    for (let i = 0; i < vertexList.length; i++) {
        for (let j = i + 1; j < vertexList.length; j++) {
            let dist = calculateDistance(vertexList[i].x, vertexList[i].y, vertexList[j].x, vertexList[j].y);
            adjMatrix[i][j] = dist;
            adjMatrix[j][i] = dist;
        }
    }
}
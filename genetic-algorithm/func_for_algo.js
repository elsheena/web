import { vertexList } from "./main.js";
import { adjMatrix } from "./main.js";
import { calculateDistance } from "./canvas_handler.js";

export {
    createDescendant,
    findFitness,
    getRandomInt,
    mutation,
    createAdjMatrix
};


function createDescendant(parent1, parent2, point_break) {
    let arr = [];
    let used_gene = [];

    for (let i = 0; i < vertexList.length; i++) {
        used_gene[i] = false;
    }

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

    if (arr.length != vertexList.length) {
        for (let i = 0; i < parent1.length; i++) {
            if (!used_gene[i]) {
                arr[arr.length] = i;
            }
        }
    }

    return arr;
}

function findFitness(mas) {
    let fit = 0;
    for (let i = 0; i < mas.length - 1; i++) {
        fit += adjMatrix[mas[i]][mas[i + 1]];
    }
    fit += adjMatrix[mas[0]][mas[mas.length - 1]];

    return fit;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function mutation(descendant) {
    let ind1 = getRandomInt(1, vertexList.length);
    let ind2 = getRandomInt(1, vertexList.length);

    if (ind1 > ind2) {
        [ind1, ind2] = [ind2, ind1];
    } else if (ind1 == ind2) {
        return descendant;
    }

    let arr = [];
    let i = ind2;

    while (arr.length <= ind1 && i < descendant.length) {
        arr[arr.length] = descendant[i];
        i++;
    }

    i = ind1 + 1;

    while (i > ind1 && i < ind2) {
        arr[arr.length] = descendant[i];
        i++;
    }

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

function createAdjMatrix() {
    for (let i = 0; i < vertexList.length; i++) {
        adjMatrix.push(new Array(vertexList.length));
    }

    for (let i = 0; i < vertexList.length; i++) {
        for (let j = i + 1; j < vertexList.length; j++) {
            let dist = calculateDistance(vertexList[i].x, vertexList[i].y, vertexList[j].x, vertexList[j].y);
            adjMatrix[i][j] = dist;
            adjMatrix[j][i] = dist;
        }
    }
}
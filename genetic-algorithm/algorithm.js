// Importing necessary modules and functions from other files
import { Chromosome } from "./classes.js";
import { activeMode, COUNT_GENERATIONS } from "./main.js";
import {
    getRandomInt,
    findFitness,
    createDescendant,
    mutation,
    createAdjMatrix
} from "./func_for_algo.js";
import { vertexList } from "./main.js";
import { MUTATION_PERCENTAGE } from "./main.js";
import {
    disableButtons,
    enableButtons
} from "./buttons_handler.js";
import { deleteEdge } from "./canvas_handler.js";
import { drawEdgeAnswer } from "./canvas_handler.js";
import { buttonsRender } from "./buttons_handler.js";

// Exporting the startAlgorithm function
export {
    startAlgorithm
}

// Array to hold the population of chromosomes
export let population = [],
    POPULATION_SIZE;

// Function to start the genetic algorithm
function startAlgorithm() {
    // Checking if vertices are drawn on the map
    if (vertexList.length === 0) {
        alert("First, draw the vertices on the map.");
        return;
    }
    // Creating adjacency matrix for the graph
    createAdjMatrix();
    // Resetting the population when adding new vertices
    POPULATION_SIZE = Math.pow(vertexList.length, 2);
    population = [];

    // Disabling buttons during algorithm execution
    disableButtons();
    // Generating initial population of chromosomes
    InitialPopulationGeneration();

    let count = 0, // Generation counter
        counter_stop = 0; // Counter to stop the program

    // Interval to iterate through generations
    let id = setInterval(function() {
        // Stopping conditions
        if (count > COUNT_GENERATIONS || counter_stop == 250) {
            deleteEdge();
            drawEdgeAnswer('#247ABF');

            // Resetting mode and rendering buttons
            activeMode.value = 0;
            buttonsRender();

            // Enabling buttons after algorithm execution
            enableButtons();
            clearInterval(id);
        }

        let fit1 = population[0].fitness; // Memorizing the best chromosome

        // Applying crossing algorithm
        CrossingAlgorithm();

        let fit2 = population[0].fitness; // Remembering the best chromosome in the modified population

        // Checking for improvement in fitness
        if (fit2 != fit1) {
            counter_stop = 0;
            deleteEdge();
            drawEdgeAnswer('#7AB0DC');
        }

        count++;
        counter_stop++;

    }, 0);
}

// Function to generate initial population
function InitialPopulationGeneration() {
    let arr = [];

    // Creating an array of vertex indices
    for (let i = 0; i < vertexList.length; i++) {
        arr[i] = i;
    }
    // Creating the first chromosome
    population[0] = new Chromosome(arr.slice(), 0);

    let i = 1;
    while (arr.length != 0 && i < POPULATION_SIZE) {
        i++;

        let j = 0;
        while (j < Math.pow(vertexList.length, 2)) {
            // Randomly shuffling the array to create diverse chromosomes
            let ind1 = getRandomInt(0, vertexList.length);
            let ind2 = getRandomInt(0, vertexList.length);

            [arr[ind1], arr[ind2]] = [arr[ind2], arr[ind1]];

            j++;
        }

        // Creating new chromosomes
        population[population.length] = new Chromosome(arr.slice(), 0);
    }

    // Calculating fitness for each chromosome
    for (let i = 0; i < population.length; i++) {
        population[i].fitness = findFitness(population[i].chromosome.slice());
    }
    // Sorting the population by fitness
    population.sort((a, b) => a.fitness - b.fitness);
}

// Function implementing the crossing algorithm
function CrossingAlgorithm() {
    let i = 0;
    while (i < Math.pow(vertexList.length, 2)) {
        // Selecting parent chromosomes randomly
        let chrom1 = population[getRandomInt(0, population.length)].chromosome.slice(0, population[0].chromosome.length);
        let chrom2 = population[getRandomInt(0, population.length)].chromosome.slice(0, population[0].chromosome.length);

        // Ensuring different parent chromosomes
        while (chrom1 == chrom2) {
            chrom1 = population[getRandomInt(0, population.length)].chromosome.slice(0, population[0].chromosome.length);
            chrom2 = population[getRandomInt(0, population.length)].chromosome.slice(0, population[0].chromosome.length);
        }

        // Randomly selecting crossover point
        let point_break = getRandomInt(1, vertexList.length);
        // Creating descendants through crossover
        let descendant1 = createDescendant(chrom1, chrom2, point_break).slice(0, population[0].length) // Forming 1 descendant
        let descendant2 = createDescendant(chrom2, chrom1, point_break).slice(0, population[0].length) // Forming 2 descendants

        // Applying mutation
        MutationAlgorithm(descendant1.slice(), descendant2.slice());

        i++;
    }

    // Sorting the population by fitness
    population.sort((a, b) => a.fitness - b.fitness);

    // Truncating the population to the specified size
    population.splice(POPULATION_SIZE, population.length);
}

// Function to apply mutation to chromosomes
function MutationAlgorithm(descendant1, descendant2) {
    let num = getRandomInt(0, 101);
    let ind1;
    let ind2;

    // Applying mutation based on probability
    if (num < MUTATION_PERCENTAGE) {
        descendant1 = mutation(descendant1.slice());
        descendant2 = mutation(descendant2.slice());
    }

    // Adding mutated descendants to the population
    AddDescendantsToPopulation(descendant1.slice(), descendant2.slice());
}

// Function to add descendants to the population
function AddDescendantsToPopulation(descendant1, descendant2) {
    population[population.length] = new Chromosome(descendant1, 0);
    population[population.length] = new Chromosome(descendant2, 0);

    // Recalculating fitness for the population
    for (let i = 0; i < population.length; i++) {
        population[i].fitness = findFitness(population[i].chromosome.slice());
    }
}
// Define the cities array
let cities = [];

// Define the canvas and context variables
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

// Define the genetic algorithm parameters
let populationSize = 100;
let mutationRate = 0.02;
let iterationLimit = 1000;

// Define the genetic algorithm variables
let population;
let bestSolution;
let bestFitness;
let iteration;
let iterationInterval;



// Define the fitness function for a TSP solution
function fitness(solution) {
  let totalDistance = 0;
  for (let i = 0; i < solution.length; i++) {
    const city1 = solution[i];
    const city2 = solution[(i + 1) % solution.length];
    const dx = city1.x - city2.x;
    const dy = city1.y - city2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    totalDistance += distance;
  }
  return totalDistance;
}

// Define the mutation operator for a TSP solution
function mutate(solution) {
  for (let i = 0; i < solution.length; i++) {
    if (Math.random() < mutationRate) {
      const j = Math.floor(Math.random() * solution.length);
      [solution[i], solution[j]] = [solution[j], solution[i]];
    }
  }
}

// Define the tournament selection operator for the genetic algorithm
function tournamentSelection(population, size) {
  const candidates = [];
  for (let i = 0; i < size; i++) {
    const candidate = population[Math.floor(Math.random() * population.length)];
    candidates.push(candidate);
  }
  return candidates.reduce((best, candidate) => {
    const bestFitness = fitness(best);
    const candidateFitness = fitness(candidate);
    return candidateFitness < bestFitness ? candidate : best;
  });
}

// Define the crossover operator for two TSP solutions
function crossover(parent1, parent2) {
  const child = Array.from({ length: parent1.length });
  const startPos = Math.floor(Math.random() * parent1.length);
  const endPos = Math.floor(Math.random() * (parent1.length - startPos)) + startPos;
  for (let i = startPos; i <= endPos; i++) {
    child[i] = parent1[i];
  }
  let j = 0;
  for (let i = 0; i < parent2.length; i++) {
    if (!child.includes(parent2[i])) {
      while (child[j] !== undefined) {
        j++;
      }
      child[j] = parent2[i];
    }
  }
  return child;
}

// Define the initialization function for the genetic algorithm
function initializeGA() {
  clearInterval(iterationInterval);

  if (cities.length < 2) {
    alert("Please add at least 2 cities.");
    return;
  }

  population = [];
  for (let i = 0; i < populationSize; i++) {
    const path = [...cities];
    for (let j = 0; j < path.length; j++) {
      const k = Math.floor(Math.random() * path.length);
      const temp = path[j];
      path[j] = path[k];
      path[k] = temp;
    }
    population.push(path);
  }

  bestSolution = null;
  bestFitness = Infinity;
  iteration = 0;

  iterationInterval = setInterval(iterateGA, 1);
}

// Define the main iteration function for the genetic algorithm
function iterateGA() {
  if (iteration >= iterationLimit) {
    clearInterval(iterationInterval);
    return;
  }

  const parent1 = tournamentSelection(population, 5);
  const parent2 = tournamentSelection(population, 5);
  const child = crossover(parent1, parent2);
  mutate(child);

  const worstIndex = population.findIndex((path) => fitness(path) === Math.max(...population.map(fitness)));
  population[worstIndex] = child;

  const childFitness = fitness(child);
  if (childFitness < bestFitness) {
    bestSolution = child;
    bestFitness = childFitness;
    drawBestSolution();
  }

  iteration++;
}

// Define the function to clear the canvas and draw the cities
function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawCities();
}

// Define the function to draw the cities on the canvas
function drawCities() {
  for (const city of cities) {
    context.beginPath();
    context.arc(city.x, city.y, 3, 0, 2 * Math.PI);
    context.fillStyle = "#000000";
    context.fill();
    context.closePath();
  }
}

// Define the function to draw the best solution path on the canvas
function drawBestSolution() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawCities();

  context.beginPath();
  context.moveTo(bestSolution[0].x, bestSolution[0].y);
  for (let i = 1; i < bestSolution.length; i++) {
    const city = bestSolution[i];
    context.lineTo(city.x, city.y);
  }
  context.strokeStyle = "black";
  context.lineWidth = 2;
  context.stroke();
  context.closePath();
}

// Define the function to handle the click event on the canvas
function addCity(event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  cities.push({ x, y });
  drawCities();
}

// Define the function to clear the cities
function clearCities() {
  cities = [];
  clearCanvas();
  clearInterval(iterationInterval);
  bestSolution = null;
  bestFitness = Infinity;
}

// Add event listeners
canvas.addEventListener("click", addCity);
document.getElementById("start-button").addEventListener("click", initializeGA);
document.getElementById("clear-button").addEventListener("click", clearCities);

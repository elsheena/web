//              Fermon              
import { vars } from "./vars.js";

export function reset() {
    for (let i = 1; i < vars.mainObjects.length - 1; i++) {
        for (let j = 1; j < vars.mainObjects[i].length - 1; j++) {
            vars.mainObjects[i][j].notEmpty = false;
            vars.mainObjects[i][j].wall = false;
            vars.mainObjects[i][j].food = 0;
        }
    }
    for (let i = 0; i < vars.pheromones.length; i++) {
        for (let j = 0; j < vars.pheromones[i].length; j++) {
            vars.pheromones[i][j].notEmpty = false;
            vars.pheromones[i][j].toHomePheromones = 0;
            vars.pheromones[i][j].toFoodPheromones = 0;
        }
    }

    vars.anthill.isBuilt = false;

    vars.somethingChanged = true;
}

//                               Fermon                               
export function initPheromones() {
    for (let i = 0; i < vars.pheromones.length; i++) {
        vars.pheromones[i] = new Array(vars.MyCanvas.height / vars.mapPheromoneScale);
        for (let j = 0; j < vars.pheromones[i].length; j++) {
            vars.pheromones[i][j] = {
                notEmpty: false,
                x: i * vars.mapPheromoneScale,
                y: j * vars.mapPheromoneScale,
                toHomePheromones: 0,
                toFoodPheromones: 0,
                next: function() {
                    if (this.notEmpty) {
                        this.toHomePheromones *= vars.pheromonesDecreasingCoefficient;
                        this.toFoodPheromones *= vars.pheromonesDecreasingCoefficient;

                        if (this.toHomePheromones < vars.minPheromoneValue)
                            this.toHomePheromones = 0;
                        if (this.toFoodPheromones < vars.minPheromoneValue)
                            this.toFoodPheromones = 0;

                        if (this.toFoodPheromones === 0 && this.toHomePheromones === 0)
                            this.notEmpty = false;
                    }
                }
            }
        }
    }
}


//                               WALLS AND FOOD                               
export function initMainObjects() {
    for (let i = 0; i < vars.mainObjects.length; i++) {
        vars.mainObjects[i] = new Array(vars.MyCanvas.height / vars.mapPixelScale);
        for (let j = 0; j < vars.mainObjects[i].length; j++) {
            vars.mainObjects[i][j] = {
                notEmpty: false,
                x: i * vars.mapPixelScale,
                y: j * vars.mapPixelScale,
                food: 0,
                wall: false,
                next: function() {
                    if (this.wall) {

                        //WALLS
                        vars.extraCtxForMainObjects.fillStyle = "#95A3A4";
                        vars.extraCtxForMainObjects.fillRect(this.x, this.y, vars.mapPixelScale, vars.mapPixelScale);

                    } else if (this.food > 0) {

                        //FOOD
                        if (this.food < 16) {
                            vars.extraCtxForMainObjects.strokeStyle = `#000${(this.food).toString(16)}00`;
                            vars.extraCtxForMainObjects.fillStyle = `#000${(this.food).toString(16)}00`;
                        } else {
                            vars.extraCtxForMainObjects.strokeStyle = `#00${(this.food).toString(16)}00`;
                            vars.extraCtxForMainObjects.fillStyle = `#00${(this.food).toString(16)}00`;
                        }
                        vars.extraCtxForMainObjects.beginPath();
                        vars.extraCtxForMainObjects.arc(this.x + vars.mapPixelScale / 2, this.y + vars.mapPixelScale / 2, vars.mapPixelScale / 2, 0, Math.PI * 2, false);
                        vars.extraCtxForMainObjects.closePath();
                        vars.extraCtxForMainObjects.fill();
                        vars.extraCtxForMainObjects.stroke();
                    }
                }
            }
        }
    }
    for (let i = 0; i < vars.mainObjects.length; i++) {
        vars.mainObjects[i][0].notEmpty = true;
        vars.mainObjects[i][0].wall = true;
        vars.mainObjects[i][vars.mainObjects[i].length - 1].notEmpty = true;
        vars.mainObjects[i][vars.mainObjects[i].length - 1].wall = true;
    }
    for (let i = 0; i < vars.mainObjects[0].length; i++) {
        vars.mainObjects[0][i].notEmpty = true;
        vars.mainObjects[0][i].wall = true;
        vars.mainObjects[vars.mainObjects.length - 1][i].notEmpty = true;
        vars.mainObjects[vars.mainObjects.length - 1][i].wall = true;
    }
}


//                           ANTS                          
export function initAnts() {
    vars.ants = new Array(vars.antsNumber);
    for (let i = 0; i < vars.ants.length; i++) {
        let r1 = Math.random() * 2 - 1;
        let r2 = Math.random() * 2 - 1;
        vars.ants[i] = {
            it: 0,
            itStayedInObject: 0,
            distanceFromHome: 1,
            distanceFromFood: 1,
            chosenPheromoneI: -1,
            chosenPheromoneJ: -1,
            Vx: r1,
            Vy: r2,
            Food: 0,
            x: vars.anthill.x + (r1 * (vars.anthill.radius + vars.firstStepLength)) / (Math.sqrt(r1 ** 2 + r2 ** 2)),
            y: vars.anthill.y + (r2 * (vars.anthill.radius + vars.firstStepLength)) / (Math.sqrt(r1 ** 2 + r2 ** 2)),
            next: function() {

                this.it = (this.it + 1) % 1000000;


                //KILL AN ANT IF YOU CLIMB WHERE YOU DON'T NEED TO
                if (this.itStayedInObject > 10 || this.x < 0 || this.y < 0 || this.x > vars.MyCanvas.offsetWidth || this.y > vars.MyCanvas.offsetHeight || (Math.sqrt((this.x - vars.anthill.x) ** 2 + (this.y - vars.anthill.y) ** 2) - vars.anthill.radius < 0)) {
                    let r1 = Math.random() * 2 - 1;
                    let r2 = Math.random() * 2 - 1;
                    this.it = 0;
                    this.itStayedInObject = 0;
                    this.distanceFromHome = 1;
                    this.distanceFromFood = 1;
                    this.chosenPheromoneI = -1;
                    this.chosenPheromoneJ = -1;
                    this.Vx = r1;
                    this.Vy = r2;
                    this.Food = 0;
                    this.x = vars.anthill.x + (r1 * (vars.anthill.radius + vars.firstStepLength)) / (Math.sqrt(r1 ** 2 + r2 ** 2));
                    this.y = vars.anthill.y + (r2 * (vars.anthill.radius + vars.firstStepLength)) / (Math.sqrt(r1 ** 2 + r2 ** 2));
                }

                //COLLISION WITH AN ANTHILL
                if (Math.sqrt((this.x - vars.anthill.x) ** 2 + (this.y - vars.anthill.y) ** 2) - vars.anthill.radius <= vars.minDistanceToAnthill) {
                    this.Vx *= -1;
                    this.Vy *= -1;
                    if (this.Food) {
                        this.distanceFromHome = 1;
                        this.distanceFromFood = 1;
                        this.chosenPheromoneI = -1;
                        this.chosenPheromoneJ = -1;
                    }
                    this.x += (Math.random() - 0.5) + (this.Vx * vars.antStepLength * 2) / (Math.sqrt(this.Vx ** 2 + this.Vy ** 2));
                    this.y += (Math.random() - 0.5) + (this.Vy * vars.antStepLength * 2) / (Math.sqrt(this.Vx ** 2 + this.Vy ** 2));
                    this.Food = 0;
                } else {

                    //ADJUSTING THE DIRECTION OF MOVEMENT
                    let x = this.x,
                        y = this.y;
                    let i = Math.floor(x / vars.mapPixelScale);
                    let j = Math.floor(y / vars.mapPixelScale);
                    if (vars.mainObjects[i][j].notEmpty) {

                        this.itStayedInObject++;

                        //IF YOU HIT THE FOOD
                        if (vars.mainObjects[i][j].food && this.Food === 0) {
                            this.distanceFromHome = 1;
                            this.distanceFromFood = 1;
                            this.chosenPheromoneI = -1;
                            this.chosenPheromoneJ = -1;
                            this.Food = vars.mainObjects[i][j].food;
                            vars.mainObjects[i][j].food = Math.max(0, vars.mainObjects[i][j].food - 10);
                            if (vars.mainObjects[i][j].food === 0)
                                vars.mainObjects[i][j].notEmpty = false;
                            vars.somethingChanged = true;
                        }

                        //WHEN YOU HIT SOMETHING, THEN DEVIATE IN THE RIGHT DIRECTION
                        x += (this.Vx * (-1) * vars.antStepLength) / (Math.sqrt(this.Vx ** 2 + this.Vy ** 2));
                        y += (this.Vy * vars.antStepLength) / (Math.sqrt(this.Vx ** 2 + this.Vy ** 2));
                        i = Math.floor(x / vars.mapPixelScale);
                        j = Math.floor(y / vars.mapPixelScale);
                        if (i >= 0 && j >= 0 && !vars.mainObjects[i][j].notEmpty)
                            this.Vx *= -1;
                        else {
                            x = this.x;
                            y = this.y;
                            x += (this.Vx * vars.antStepLength) / (Math.sqrt(this.Vx ** 2 + this.Vy ** 2));
                            y += (this.Vy * (-1) * vars.antStepLength) / (Math.sqrt(this.Vx ** 2 + this.Vy ** 2));
                            i = Math.floor(x / vars.mapPixelScale);
                            j = Math.floor(y / vars.mapPixelScale);
                            if (i >= 0 && j >= 0 && !vars.mainObjects[i][j].notEmpty)
                                this.Vy *= -1;
                            else {
                                this.Vx *= -1;
                                this.Vy *= -1;
                            }
                        }
                    } else {

                        this.itStayedInObject = 0;

                        //ANALYZE NEARBY PHEROMONES
                        //CHOOSE THE BEST ONE AND MOST LIKELY TURN TO IT
                        if (this.it % vars.howOftenToUpdateAntsDirectionByPheromones === 0) {
                            x = this.x;
                            y = this.y;
                            i = Math.floor(x / vars.mapPheromoneScale);
                            j = Math.floor(y / vars.mapPheromoneScale);

                            let iBestPheromone = -1,
                                jBestPheromone = -1;
                            for (let ii = i - vars.radiusOfAntsEyes; ii < i + vars.radiusOfAntsEyes; ii++) {
                                for (let jj = j - vars.radiusOfAntsEyes; jj < j + vars.radiusOfAntsEyes; jj++) {
                                    if (ii >= 0 && jj >= 0 && ii < vars.pheromones.length && jj < vars.pheromones[0].length && vars.pheromones[ii][jj].notEmpty && ((this.Food && vars.pheromones[i][j].toHomePheromones) || (!this.Food && vars.pheromones[i][j].toFoodPheromones))) {
                                        if ((Math.abs(this.Vx / this.Vy) > 1 && i * ii > 0) || (Math.abs(this.Vy / this.Vx) > 1 && j * jj > 0)) { //это проверка, чтобы не оборачивался муравей
                                            if (this.Food) {
                                                if (iBestPheromone === -1 || (vars.pheromones[ii][jj].toHomePheromones > vars.pheromones[iBestPheromone][jBestPheromone].toHomePheromones)) {
                                                    iBestPheromone = ii;
                                                    jBestPheromone = jj;
                                                }
                                            } else {
                                                if (iBestPheromone === -1 || (vars.pheromones[ii][jj].toFoodPheromones > vars.pheromones[iBestPheromone][jBestPheromone].toFoodPheromones)) {
                                                    iBestPheromone = ii;
                                                    jBestPheromone = jj;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            if (iBestPheromone !== -1 && !(Math.abs(iBestPheromone - this.chosenPheromoneI) < 5 && Math.abs(jBestPheromone - this.chosenPheromoneJ) < 5)) {
                                if (Math.random() < vars.howOftenToChooseGoodPath) {
                                    this.Vx = (iBestPheromone + 1) * vars.mapPheromoneScale - this.x;
                                    this.Vy = (jBestPheromone + 1) * vars.mapPheromoneScale - this.y;
                                    this.chosenPheromoneI = iBestPheromone;
                                    this.chosenPheromoneJ = jBestPheromone;
                                }
                            }

                            //CHECKING IF HE CAN ALREADY SEE THE ANTHILL
                            if (this.Food && (Math.sqrt((this.x - vars.anthill.x) ** 2 + (this.y - vars.anthill.y) ** 2) - vars.anthill.radius < vars.radiusOfAntsEyes * vars.mapPixelScale)) {
                                if (Math.random() < vars.howOftenToChooseGoodPath) {
                                    this.Vx = vars.anthill.x - this.x;
                                    this.Vy = vars.anthill.y - this.y;
                                }
                            }

                            //CHECKING IF HE CAN ALREADY SEE THE FOOD
                            if (!this.Food) {
                                x = this.x;
                                y = this.y;
                                i = Math.floor(x / vars.mapPixelScale);
                                j = Math.floor(y / vars.mapPixelScale);
                                let iBestFood = -1,
                                    jBestFood = -1;
                                for (let ii = i - vars.radiusOfAntsEyes; ii < i + vars.radiusOfAntsEyes; ii++) {
                                    for (let jj = j - vars.radiusOfAntsEyes; jj < j + vars.radiusOfAntsEyes; jj++) {
                                        if (ii >= 0 && jj >= 0 && ii < vars.mainObjects.length && jj < vars.mainObjects[0].length && vars.mainObjects[ii][jj].Food) {
                                            if (iBestPheromone === -1 || (vars.mainObjects[ii][jj].Food > vars.mainObjects[iBestFood][jBestFood].Food)) {
                                                iBestFood = ii;
                                                jBestFood = jj;
                                            }
                                        }
                                    }
                                }
                                if (iBestFood !== -1) {
                                    if (Math.random() < vars.howOftenToChooseGoodPath) {
                                        this.Vx = (iBestFood + 1) * vars.mapPixelScale - this.x;
                                        this.Vy = (jBestFood + 1) * vars.mapPixelScale - this.y;
                                    }
                                }
                            }
                        }

                        if (this.it % vars.howOftenToLeavePheromones === 0) {

                            //PHEROMONE ABANDONMENT
                            x = this.x;
                            y = this.y;
                            i = Math.floor(x / vars.mapPheromoneScale);
                            j = Math.floor(y / vars.mapPheromoneScale);

                            if (i >= 0 && j >= 0 && (!vars.mainObjects[Math.floor(x / vars.mapPixelScale) - 1][Math.floor(y / vars.mapPixelScale) - 1].notEmpty) && ((this.Food && this.distanceFromFood > 0.000001) || (!this.Food && this.distanceFromHome > 0.000001))) {
                                if (this.Food)
                                    vars.pheromones[i][j].toFoodPheromones = Math.min(100000, vars.pheromones[i][j].toFoodPheromones * 0.5 + 1.5 * (this.Food ** 2) * this.distanceFromFood);
                                else
                                    vars.pheromones[i][j].toHomePheromones = Math.min(100000, vars.pheromones[i][j].toHomePheromones * 0.5 + 1.5 * vars.constForDistanceFromHome * this.distanceFromHome);
                                vars.pheromones[i][j].notEmpty = true;

                                //REGULATE THE EVAPORATION OF PHEROMONES
                                if (this.Food) {
                                    this.distanceFromFood *= 0.95;
                                } else {
                                    this.distanceFromHome *= 0.95;
                                }
                            }
                        }
                    }
                }

                this.x += (Math.random() - 0.5) + (this.Vx * vars.antStepLength) / (Math.sqrt(this.Vx ** 2 + this.Vy ** 2));
                this.y += (Math.random() - 0.5) + (this.Vy * vars.antStepLength) / (Math.sqrt(this.Vx ** 2 + this.Vy ** 2));
            }
        }
    }
}